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
        // 🧩 Étape 1 : Extraction et résumé IA du contexte utilisateur
        let userId, objectiveText, enrichedContext;
        try {
          ({ userId, objectiveText, enrichedContext } =
            await prepareUserWorkflowContext(fields, files));
        } catch (e) {
          throw new Error('🧩 Échec prepareUserWorkflowContext: ' + e.message);
        }

        // 🧩 Étape 2 : Initialisation du workflow
        let workflowId, state;
        try {
          ({ workflowId, state } = await initializeWorkflowForUser(
            userId,
            objectiveText,
            enrichedContext
          ));
        } catch (e) {
          throw new Error('⚙️ Échec initializeWorkflowForUser: ' + e.message);
        }

        // 🧩 Étape 3 : Analyse IA de l’objectif
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

        // 🧩 Étape 4 : Enregistrement des tâches + expertises
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

        // 🧩 Étape 5 : Génération des agents IA
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

        // ✅ Réponse finale partielle
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
