// lib/workflowFileManager.js
import dotenv from 'dotenv';
dotenv.config();

import path from 'path';
import fs from 'fs/promises';
import crypto from 'crypto';

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
