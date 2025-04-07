// src/app/api/mainAgent/run/route.js (POST complet avec FormData et initialisation workflow)
import { NextResponse } from 'next/server';
import { Readable } from 'stream';
import { IncomingForm } from 'formidable';
import {
  getInitParams,
  initializeWorkflowForUser,
} from '../workflow/initForUser';
import { analyzeObjective } from '../workflow/analystAgent';
import { createAgentsFromExpertises } from '../workflow/agentFactory';
import { prepareUserWorkflowContext } from '../workflow/prepareUserWorkflowContext';
import { updateWorkflowState } from '../workflow/utils';

export const config = {
  api: {
    bodyParser: false,
  },
};

// Convertit une requête Next en un flux compatible Node.js (nécessaire pour formidable)
function toNodeRequest(req) {
  const nodeReq = Readable.from(req.body);
  nodeReq.headers = Object.fromEntries(req.headers);
  nodeReq.method = req.method;
  nodeReq.url = '';
  return nodeReq;
}

export async function POST(req) {
  const nodeReq = toNodeRequest(req);
  const form = new IncomingForm({ multiples: true });

  return new Promise((resolve) => {
    form.parse(nodeReq, async (err, fields, files) => {
      if (err) {
        console.error('❌ Erreur parsing FormData:', err);
        return resolve(
          NextResponse.json({ error: 'Erreur de parsing' }, { status: 500 })
        );
      }

      try {
        ///////////////////////////////////////////////////////////////////
        // 🧩 Étape 1 : Extraction et résumé IA du contexte utilisateur //
        ///////////////////////////////////////////////////////////////////
        let userId, objectiveText, filesContext;
        try {
          ({ userId, objectiveText, filesContext } =
            await prepareUserWorkflowContext(fields, files));
        } catch (e) {
          throw new Error('🧩 Échec prepareUserWorkflowContext: ' + e.message);
        }

        console.info('prepareUserWorkflowContext', {
          userId,
          objectiveText,
          filesContext,
        });

        //////////////////////////////////////////////
        // 🧩 Étape 2 : Initialisation du workflow //
        //////////////////////////////////////////////
        let workflowId, state;
        const enrichedContext = filesContext?.enrichedContext ?? {};
        try {
          ({ workflowId, state } = await initializeWorkflowForUser({
            userId,
            objectiveText,
            enrichedContext,
          }));
        } catch (e) {
          throw new Error('⚙️ Échec initializeWorkflowForUser: ' + e.message);
        }

        console.info('initializeWorkflowForUser', {
          workflowId,
          state,
        });

        ////////////////////////////////////////////
        // 🧩 Étape 3 : Analyse IA de l’objectif //
        ////////////////////////////////////////////
        let tasks, expertises;
        try {
          const summary = enrichedContext?.summary || '';
          const keyElements = enrichedContext?.keyElements || null;

          ({ tasks, expertises } = await analyzeObjective({
            objective: objectiveText,
            context: { summary, keyElements },
          }));
        } catch (e) {
          throw new Error('🔎 Échec analyzeObjective: ' + e.message);
        }

        console.info('analyzeObjective', {
          tasks,
          expertises,
        });

        //////////////////////////////////////////////////////////
        // 🧩 Étape 4 : Enregistrement des tâches + expertises //
        //////////////////////////////////////////////////////////
        try {
          state.tasks = tasks;
          state.expertises = expertises;
          state.logs.push({
            type: 'info',
            message: `🧠 Objectif analysé avec succès : ${tasks.length} tâches, ${expertises.length} expertises.`,
          });
          await updateWorkflowState(userId, workflowId, state);
        } catch (e) {
          throw new Error(
            '💾 Échec updateWorkflowState (après analyse): ' + e.message
          );
        }

        console.info('updateWorkflowState (après analyse)', state);

        ////////////////////////////////////////////
        // 🧩 Étape 5 : Génération des agents IA //
        ////////////////////////////////////////////
        let agents;
        try {
          agents = await createAgentsFromExpertises(
            expertises,
            objectiveText,
            enrichedContext
          );
        } catch (e) {
          throw new Error('🤖 Échec createAgentsFromExpertises: ' + e.message);
        }

        console.info('createAgentsFromExpertises', agents);

        /////////////////////////////////////////////
        // 🧩 Étape 6 : Enregistrement des agents //
        ////////////////////////////////////////////
        try {
          state.agents = agents;

          state.logs.push({
            type: 'info',
            message: `🤖 ${agents.length} agents IA spécialisés créés à partir des expertises.`,
          });

          await updateWorkflowState(userId, workflowId, state);
        } catch (e) {
          throw new Error(
            '💾 Échec updateWorkflowState (après création agents): ' + e.message
          );
        }

        console.info('updateWorkflowState (après création agents)', state);

        ///////////////////////////////////////////////////////////////////////////////
        // 🧩 Étape 6bis : Initialisation de la mémoire IA (par agent et par tâche) //
        //////////////////////////////////////////////////////////////////////////////
        try {
          state.memory = {
            version: 1,
            content: {
              byAgent: Object.fromEntries(
                agents.map((a) => [a.id, []]) // chaque agent a sa mémoire vide
              ),
              byTask: Object.fromEntries(
                tasks.map((t, i) => [`task-${i + 1}`, []]) // chaque tâche a sa mémoire vide
              ),
            },
          };

          state.logs.push({
            type: 'info',
            message: `🧠 Mémoire IA initialisée pour ${agents.length} agents et ${tasks.length} tâches.`,
          });

          await updateWorkflowState(userId, workflowId, state);
        } catch (e) {
          throw new Error(
            '💾 Échec updateWorkflowState (initialisation mémoire): ' +
              e.message
          );
        }

        console.info('updateWorkflowState (initialisation mémoire)', state);

        //////////////////////////////////
        // ✅ Réponse finale partielle //
        /////////////////////////////////
        return resolve(
          NextResponse.json({
            workflowId,
            logs: state.logs,
            memory: state.memory,
            output: { tasks, expertises, agents },
            validation: state.validation,
          })
        );
      } catch (err) {
        console.error(
          '❌ Erreur dans le cycle d’orchestration IA:',
          err.message
        );
        return resolve(
          NextResponse.json({ error: err.message }, { status: 500 })
        );
      }
    });
  });
}
