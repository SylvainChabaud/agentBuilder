// src/app/api/mainAgent/workflow/callAgentForTask.js
import { DEFAULT_IA_MODEL } from '../constants';
import { callModelAndExtract } from '../lib/callModel';
import { buildFinalUserPrompt } from './utils';

/**
 * Appelle un agent IA pour exécuter une tâche avec des inputs
 * @param {Agent} agent
 * @param {Task} task
 * @param {Array<any>} dependencyOutputs
 * @returns {Promise<any>} Résultat IA
 */
export async function callAgentForTask(agent, task, dependencyOutputs = []) {
  const finalPrompt = buildFinalUserPrompt({
    basePrompt: agent.userPrompt?.trim(),
    task,
    objective: agent.memory.context.objective?.[0] || '',
    context: agent.memory.context,
    dependencyOutputs,
  });

  const messages = [
    { role: 'system', content: agent.systemPrompt },
    { role: 'user', content: finalPrompt },
  ];

  const iaRequest = {
    messages,
    ...DEFAULT_IA_MODEL,
  };

  const { result, tokenUsage } = await callModelAndExtract(iaRequest);
  return { result, tokenUsage };
}
