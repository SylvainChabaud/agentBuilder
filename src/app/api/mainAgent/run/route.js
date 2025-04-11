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
import { planChallenge } from '../workflow/strategyPlannerAgent';
import { runWorkflowPlan } from '../workflow/runWorkflowPlan';
import { MOCK_RUN_WORKFLOW } from '../workflow/mocks';
import { info } from 'console';
import { generateFinalOutputWithWriter } from '../workflow/outputBuilderAgent';

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
        let userId,
          objectiveText,
          contextFiles,
          tokenUsages = [];

        try {
          ({ userId, objectiveText, contextFiles } =
            await prepareUserWorkflowContext(fields, files));
        } catch (e) {
          throw new Error('🧩 Échec prepareUserWorkflowContext: ' + e.message);
        }

        console.info('prepareUserWorkflowContext', {
          userId,
          objectiveText,
          contextFiles,
        });

        //////////////////////////////////////////////
        // 🧩 Étape 2 : Initialisation du workflow //
        //////////////////////////////////////////////
        let workflowId, state;
        try {
          ({ workflowId, state } = await initializeWorkflowForUser({
            userId,
            objectiveText,
            contextFiles,
          }));
        } catch (e) {
          throw new Error('⚙️ Échec initializeWorkflowForUser: ' + e.message);
        }

        console.info('initializeWorkflowForUser', {
          workflowId,
          state,
        });

        ///////////////////////////////////////////////
        //  🧩 Étape 3 : Analyse IA de l’objectif    //
        //  + Enregistrement des tâches + expertises //
        ///////////////////////////////////////////////
        let tasks, expertises, customObjective;
        const enrichedContext = contextFiles?.enrichedContext ?? {};
        try {
          let tokenUsage;
          const summary = enrichedContext?.summary || '';
          const keyElements = enrichedContext?.keyElements || null;

          ({ tasks, expertises, customObjective, tokenUsage } =
            await analyzeObjective({
              objective: objectiveText,
              context: { summary, keyElements },
            }));

          tokenUsages.push(tokenUsage);

          state.tasks = tasks;
          state.expertises = expertises;
          state.objective.customText = customObjective;
          state.logs.push({
            type: 'info',
            message: `🧠 Objectif analysé avec succès : ${tasks.length} tâches, ${expertises.length} expertises.`,
          });

          console.info('updateWorkflowState (après analyse)', state);

          await updateWorkflowState(userId, workflowId, state);
        } catch (e) {
          throw new Error('🔎 Échec analyzeObjective: ' + e.message);
        }

        console.info('analyzeObjective', {
          tasks,
          expertises,
        });

        ////////////////////////////////////////////
        // 🧩 Étape 4 : Génération des agents IA //
        //      + Enregistrement des agents       //
        ////////////////////////////////////////////
        let agents;
        try {
          const result = await createAgentsFromExpertises(
            expertises,
            customObjective,
            enrichedContext
          );

          agents = result.agents;
          tokenUsages = [...tokenUsages, ...result.tokenUsages];
          state.agents = agents;

          state.logs.push({
            type: 'info',
            message: `🤖 ${agents.length} agents IA spécialisés créés à partir des expertises.`,
          });

          console.info('updateWorkflowState (après création agents)', state);

          await updateWorkflowState(userId, workflowId, state);
        } catch (e) {
          throw new Error('🤖 Échec createAgentsFromExpertises: ' + e.message);
        }

        console.info('createAgentsFromExpertises', agents);

        ////////////////////////////////////////////////////////////////////////////
        // 🧩 Étape 5 : Initialisation de la mémoire IA (par agent et par tâche) //
        ///////////////////////////////////////////////////////////////////////////
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

          console.info('updateWorkflowState (initialisation mémoire)', state);

          await updateWorkflowState(userId, workflowId, state);
        } catch (e) {
          throw new Error(
            '💾 Échec updateWorkflowState (initialisation mémoire): ' +
              e.message
          );
        }

        /////////////////////////////////////////////////////////////////////////////
        // 🧩 Étape 6 : Planification stratégique (assignment des tâches + ordre) //
        /////////////////////////////////////////////////////////////////////////////
        let plan;
        try {
          const result = await planChallenge({
            objective: customObjective,
            tasks,
            agents,
          });

          plan = result.plan;
          tokenUsages.push(result.tokenUsage);

          // On stocke le plan dans l’état
          const securedPlan = plan?.steps ?? [];
          state.plan = securedPlan;

          // Log associé
          state.logs.push({
            type: 'info',
            message: `📋 Plan stratégique généré avec ${securedPlan.length} étapes.`,
          });

          console.info('planChallenge securedPlan', securedPlan);

          await updateWorkflowState(userId, workflowId, state);
        } catch (e) {
          throw new Error(
            '📋 Échec planChallenge (planification stratégique): ' + e.message
          );
        }

        console.info('planChallenge plan', plan);

        // MOCK //
        // const { userId, workflowId, state } = MOCK_RUN_WORKFLOW;
        // let tokenUsages = [];
        //////////////////////////////////////

        ///////////////////////////////////////
        // 🧩 Étape 7 : Exécute le WORKFLOW //
        ///////////////////////////////////////
        try {
          const { state: updatedState, tokenUsages: planTokens } =
            await runWorkflowPlan(userId, workflowId, state);

          tokenUsages = [...tokenUsages, ...planTokens];

          state.status = updatedState.status;
          state.memory = updatedState.memory;
          state.logs = updatedState.logs;

          console.info('✅ runWorkflowPlan terminé', { state });

          // Si besoin, tu peux ici stocker une `output` finale
          // state.output = ... (à implémenter plus tard)
        } catch (e) {
          throw new Error('🚀 Échec runWorkflowPlan (exécution): ' + e.message);
        }

        /////////////////////////////////////////////////////////////////////
        // 🧩 Étape 8 : Génération du livrable final (OutputBuilderAgent) //
        /////////////////////////////////////////////////////////////////////
        let finalOutput;
        try {
          const result = await generateFinalOutputWithWriter({
            objective: state.objective.customText,
            byAgent: state.memory.content.byAgent,
          });

          const tokenUsage = result.tokenUsage;
          finalOutput = result.finalOutput;

          console.info(
            'generateFinalOutputWithWriter',
            finalOutput,
            tokenUsage
          );

          tokenUsages.push(tokenUsage);

          state.memory.finalOutput = {
            // version: state.memory.version,
            generatedAt: new Date().toISOString(),
            content: finalOutput,
          };

          state.logs.push({
            type: 'info',
            message: `📄 Livrable final généré avec succès.`,
          });

          await updateWorkflowState(userId, workflowId, state);
        } catch (e) {
          throw new Error(
            '📄 Échec OutputBuilderAgent (génération livrable) : ' + e.message
          );
        }
        console.info('Workflow Tokens Usages', tokenUsages);

        //////////////////////////////////
        // ✅ Réponse finale partielle //
        /////////////////////////////////
        return resolve(
          NextResponse.json({
            workflowId,
            logs: state.logs,
            memory: state.memory,
            output: { tasks, expertises, agents, plan, finalOutput },
            // output: { finalOutput },
            validation: state.validation,
            status: state.status,
            usage: tokenUsages,
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
