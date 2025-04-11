// src/app/api/mainAgent/workflow/updateWorkflowState.js
import path from 'path';
import fs from 'fs/promises';
import { WORKFLOW_ROOT } from '../config';

/**
 * Met à jour le fichier state.json pour un workflow donné
 * @param {string} userId
 * @param {string} workflowId
 * @param {Object} state - L’état complet du workflow à sauvegarder
 * @returns {Promise<void>}
 */
export async function updateWorkflowState(userId, workflowId, state) {
  const filePath = path.join(WORKFLOW_ROOT, userId, workflowId, 'state.json');
  await fs.writeFile(filePath, JSON.stringify(state, null, 2), 'utf-8');
}
