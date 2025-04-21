// src/app/api/mainAgent/workflow/runWorkflowPlan.js
import { callAgentForTask } from './callAgentForTask';
import { buildFinalUserPrompt, updateWorkflowState } from './utils';

/**
 * Exécute chaque tâche du plan en respectant les dépendances et en injectant les outputs précédents
 * @param {string} userId
 * @param {string} workflowId
 * @param {WorkflowState} state
 * @returns {Promise<WorkflowState>} État mis à jour
 */
export async function runWorkflowPlan(userId, workflowId, state) {
  const { plan, agents } = state;
  const memory = state.memory.content;

  const tokenUsages = [];

  for (let i = 0; i < plan.length; i++) {
    const step = plan[i];
    const taskId = `task-${i + 1}`;
    const { task, assignedAgentId, dependencies } = step;
    const agent = agents.find((a) => a.id === assignedAgentId);

    // 🧠 Récupère les outputs des tâches dont dépend celle-ci
    const dependencyOutputs = dependencies.map((depName) => {
      const depIndex = state.tasks.findIndex((t) => t.name === depName);
      return memory.byTask[`task-${depIndex + 1}`] || null;
    });

    // 🧩 Exécute l’agent IA avec sa tâche et les résultats dont il dépend
    const { result, tokenUsage } = await callAgentForTask(
      userId,
      agent,
      task,
      dependencyOutputs
    );

    tokenUsages.push(tokenUsage);

    console.info('runWorkflowPlan result', result);

    // 💾 Mémorise l’output
    memory.byTask[taskId] = result;
    memory.byAgent[agent.id] = memory.byAgent[agent.id] || [];
    memory.byAgent[agent.id].push({ task, output: result });

    // 🧾 Log dans l’historique
    state.logs.push({
      type: 'info',
      message: `✅ Tâche "${task.name}" exécutée par ${agent.name}`,
    });

    // Mise à jour intermédiaire de l’état du workflow
    await updateWorkflowState(userId, workflowId, state);
  }

  state.status = 'completed';
  return { state, tokenUsages };
}
