// lib/workflowFileManager.js
import dotenv from 'dotenv';
dotenv.config();

import path from 'path';
import fs from 'fs/promises';

const WORKFLOW_ROOT = path.resolve(process.cwd(), process.env.WORKFLOW_DIR);

/**
 * Lit le fichier state.json d’un workflow
 */
export async function getWorkflowState(userId, workflowId) {
  const filePath = path.join(WORKFLOW_ROOT, userId, workflowId, 'state.json');
  const raw = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(raw);
}

/**
 * Met à jour (merge) le fichier state.json
 */
export async function updateWorkflowState(userId, workflowId, patch = {}) {
  const filePath = path.join(WORKFLOW_ROOT, userId, workflowId, 'state.json');
  const state = JSON.parse(await fs.readFile(filePath, 'utf-8'));
  const updated = { ...state, ...patch };
  await fs.writeFile(filePath, JSON.stringify(updated, null, 2));
  return updated;
}

/**
 * Supprime un workflow complet
 */
export async function deleteWorkflow(userId, workflowId) {
  const dir = path.join(WORKFLOW_ROOT, userId, workflowId);
  console.info('deleteWorkflow', { userId, workflowId });
  await fs.rm(dir, { recursive: true, force: true });
}

/**
 * Liste les workflows disponibles pour un utilisateur
 */
export async function listWorkflows(userId) {
  const userPath = path.join(WORKFLOW_ROOT, userId);
  try {
    const entries = await fs.readdir(userPath);
    return entries;
  } catch {
    return [];
  }
}
