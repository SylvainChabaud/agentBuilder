import {
  deleteWorkflow,
  generateWorkflowId,
  initWorkflow,
} from '../lib/workflowFileManager';

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
