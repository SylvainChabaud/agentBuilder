import dotenv from 'dotenv';
dotenv.config();

import path from 'path';
import fs from 'fs/promises';
import crypto from 'crypto';
import { extractFileContent } from './utils';

const WORKFLOW_ROOT = path.resolve(process.cwd(), process.env.WORKFLOW_DIR);

/**
 * Génère un identifiant unique (workflowId)
 */
function generateWorkflowId() {
  return crypto.randomUUID();
}

/**
 * Crée un nouveau dossier workflow et y écrit le state.json
 * @param {string} userId
 * @param {Object} initialState
 * @returns {Promise<string>} workflowId
 */
async function initWorkflow(userId, initialState, workflowId) {
  // console.info('initWorkflow 123', { userId, initialState });

  const basePath = path.join(WORKFLOW_ROOT, userId, workflowId);
  await fs.mkdir(basePath, { recursive: true });

  // console.info('initWorkflow 456', basePath);

  const filePath = path.join(basePath, 'state.json');
  await fs.writeFile(filePath, JSON.stringify(initialState, null, 2));

  // console.info('initWorkflow 789', filePath);

  return workflowId;
}

/**
 * Initialise un nouveau workflow IA pour un utilisateur donné.
 * @param {string} userId - L'identifiant de l'utilisateur
 * @param {string} objectiveText - L’objectif exprimé en langage naturel
 * @param {Array<{ name: string, path: string }>} contextFiles - Liste des fichiers reçus
 * @returns {Promise<{ workflowId: string, state: import('@/types').WorkflowState }>}
 */
export async function initializeWorkflowForUser({
  userId,
  objectiveText,
  enrichedContext = [],
}) {
  const workflowId = generateWorkflowId();

  // console.info('initializeWorkflowForUser 123', {
  //   userId,
  //   workflowId,
  //   enrichedContext,
  // });

  /** @type {import('@/types').WorkflowState} */
  const initialState = {
    workflowId,
    status: 'initialized',
    objective: {
      id: workflowId,
      text: objectiveText,
      context: enrichedContext,
    },
    tasks: [],
    agents: [],
    plan: undefined,
    memory: {
      version: 1,
      content: {
        byAgent: {},
        byTask: {},
      },
    },
    logs: [
      {
        type: 'info',
        message:
          '🚀 Nouveau workflow initialisé. Objectif enregistré : ' +
          objectiveText,
      },
    ],
    output: null,
    validation: null,
  };

  await initWorkflow(userId, initialState, workflowId);

  return { workflowId, state: initialState };
}
