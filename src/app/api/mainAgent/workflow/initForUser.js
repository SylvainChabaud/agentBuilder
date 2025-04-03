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
export function generateWorkflowId() {
  return crypto.randomUUID();
}

/**
 * Crée un nouveau dossier workflow et y écrit le state.json
 * @param {string} userId
 * @param {Object} initialState
 * @returns {Promise<string>} workflowId
 */
export async function initWorkflow(userId, initialState) {
  console.info('initWorkflow 123', { userId, initialState });

  const workflowId = generateWorkflowId();
  const basePath = path.join(WORKFLOW_ROOT, userId, workflowId);
  await fs.mkdir(basePath, { recursive: true });

  console.info('initWorkflow 456', basePath);

  const filePath = path.join(basePath, 'state.json');
  await fs.writeFile(filePath, JSON.stringify(initialState, null, 2));

  console.info('initWorkflow 789', filePath);

  return workflowId;
}

/**
 * Initialise un nouveau workflow IA pour un utilisateur donné.
 * @param {string} userId - L'identifiant de l'utilisateur
 * @param {string} objectiveText - L’objectif exprimé en langage naturel
 * @param {Array<{ name: string, path: string }>} contextFiles - Liste des fichiers reçus
 * @returns {Promise<{ workflowId: string, state: import('@/types').WorkflowState }>}
 */
export async function initializeWorkflowForUser(
  userId,
  objectiveText,
  contextFiles = []
) {
  const workflowId = generateWorkflowId();

  console.info('initializeWorkflowForUser 123', {
    userId,
    workflowId,
    contextFiles,
  });

  /** @type {import('@/types').WorkflowState} */
  const initialState = {
    workflowId,
    status: 'initialized',
    objective: {
      id: workflowId,
      text: objectiveText,
      files: contextFiles,
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
      { type: 'info', message: '🚀 Nouveau workflow initialisé.' },
      { type: 'info', message: '🎯 Objectif enregistré : ' + objectiveText },
    ],
    output: null,
    validation: null,
  };

  await initWorkflow(userId, initialState);

  return { workflowId, state: initialState };
}

export const getInitParams = async (fields, files) => {
  console.info('getInitParams', { fields, files });
  const objectiveText = fields.objective;
  const userIdRaw = fields.userId ?? 'demo';
  const userId = Array.isArray(userIdRaw) ? userIdRaw[0] : userIdRaw;

  const contextFiles = Array.isArray(files.files)
    ? files.files
    : files.files
      ? [files.files]
      : [];

  const enrichedFiles = await Promise.all(
    contextFiles.map(async (f) => ({
      name: f.originalFilename,
      path: f.filepath,
      type: f.mimetype,
      content: await extractFileContent(f),
    }))
  );

  console.info('getInitParams 123', { userId, objectiveText, enrichedFiles });

  return { userId, objectiveText, contextFiles: enrichedFiles };
};
