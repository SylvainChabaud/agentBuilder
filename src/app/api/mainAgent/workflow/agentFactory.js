// lib/ia/AgentFactory.js
import { DEFAULT_IA_MODEL } from '../constants';
import {
  generatePromptForExpertise,
  SYSTEM_MESSAGE,
} from '../expertPrompts/systemPromptBuilderAgent';
import { callModelAndExtract } from '../lib/callModel';

/**
 * Crée dynamiquement une liste d’agents IA spécialisés (coWorkers) selon les expertises données
 * @param {string[]} expertises - Liste des expertises requises (ex: "juridique", "stratégie", "excel")
 * @param {string} objective - Objectif global utilisateur
 * @returns {Promise<Agent[]>}
 */
export async function createAgentsFromExpertises(expertises, objective) {
  console.info('createAgentsFromExpertises', { expertises, objective });

  if (!Array.isArray(expertises) || expertises.length === 0) {
    throw new Error('Aucune expertise fournie à AgentFactory');
  }

  const agents = await Promise.all(
    expertises.map(async (expertise, index) => {
      const messages = [
        { role: 'system', content: SYSTEM_MESSAGE },
        {
          role: 'user',
          content: generatePromptForExpertise(objective, expertise),
        },
      ];

      const iaRequest = {
        messages,
        model: DEFAULT_IA_MODEL,
        isOpenRouter: false,
      };

      const {
        result: { system, user },
      } = await callModelAndExtract(iaRequest);

      console.info('callModelAndExtract 9999', { system, user });

      const agentId = `agent-${index + 1}-${expertise.toLowerCase().replace(/\s+/g, '-')}`;

      return {
        id: agentId,
        name: `Agent ${expertise}`,
        role: 'coWorker',
        expertise,
        systemPrompt: system,
        userPrompt: user,
        tools: inferToolsForExpertise(expertise),
        memory: {},
        status: 'idle',
      };
    })
  );

  console.info('✅ Agents générés avec prompts :', agents);
  return { agents };
}

/**
 * Fonction basique pour déduire des outils d’un agent à partir de son domaine d’expertise
 * (à étendre dynamiquement plus tard)
 * @param {string} expertise
 * @returns {string[]} Liste d’outils (nom symbolique)
 */
function inferToolsForExpertise(expertise) {
  const mapping = {
    juridique: ['text-analyzer', 'pdf-reader'],
    stratégie: ['notion-writer', 'web-research'],
    excel: ['sheet-writer', 'formula-builder'],
    marketing: ['persona-generator', 'seo-analyzer'],
    default: ['generic-llm'],
  };

  const key = Object.keys(mapping).find((k) =>
    expertise.toLowerCase().includes(k)
  );
  return mapping[key] || mapping['default'];
}
