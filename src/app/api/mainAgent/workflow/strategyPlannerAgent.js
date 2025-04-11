// lib/ia/agents/strategyPlannerAgent.js

import { DEFAULT_IA_MODEL } from '../constants';
import { callModelAndExtract } from '../lib/callModel';

const SYSTEM_MESSAGE = `
Tu es un agent planificateur IA, expert en gestion de projets complexes.
Ton rôle est d'analyser des tâches, les expertises des agents IA disponibles et de créer un plan logique d'exécution avec répartition intelligente des tâches.
Tu travailles en français et produis uniquement du JSON structuré.`;

const STRATEGY_PLANNER_PROMPT = (objective, tasks, agents) => `
Objectif utilisateur : "${objective}"

Tâches à planifier :
${JSON.stringify(tasks, null, 2)}

Agents IA disponibles :
${JSON.stringify(
  agents.map(({ id, name, expertise }) => ({ id, name, expertise })),
  null,
  2
)}

Ta mission :
1. Attribue chaque tâche à l'agent le plus compétent.
2. Propose un ordre logique d'exécution.
3. Si une tâche dépend d'une autre, indique-le dans "dependencies".

Format de réponse (JSON uniquement) :
{
  "steps": [
    {
      "task": { "name": "string", "description": "string", "priority": "low" | "medium" | "high" },
      "assignedAgentId": "agent-id",
      "dependencies": ["task-name-optionnelle"]
    }
  ]
}`;

/**
 * Appelle une IA pour construire un plan d’exécution des tâches avec répartition sur les agents
 * @param {Object} params
 * @param {string} params.objective
 * @param {Task[]} params.tasks
 * @param {Agent[]} params.agents
 * @returns {Promise<{ steps: { task: Task, assignedAgentId: string, dependencies?: string[] }[] }>}
 */
export async function planChallenge({ objective, tasks, agents }) {
  const messages = [
    { role: 'system', content: SYSTEM_MESSAGE },
    {
      role: 'user',
      content: STRATEGY_PLANNER_PROMPT(objective, tasks, agents),
    },
  ];

  const iaRequest = {
    messages,
    ...DEFAULT_IA_MODEL,
  };

  const { result, tokenUsage } = await callModelAndExtract(iaRequest);

  if (!result?.steps || !Array.isArray(result.steps)) {
    throw new Error("Le plan retourné par l'IA est invalide ou vide.");
  }

  return { plan: result, tokenUsage };
}
