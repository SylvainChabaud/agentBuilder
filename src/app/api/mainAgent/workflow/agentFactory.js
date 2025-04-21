// lib/ia/AgentFactory.js
import { DEFAULT_IA_MODEL } from '../constants';
import {
  generatePromptForExpertise,
  SYSTEM_MESSAGE,
} from '../expertPrompts/systemPromptBuilderAgent';
import { callModelAndExtract } from '../lib/callModel';
// import { buildUserPromptForAgent } from './buildUserPromptForAgent';

/**
 * Crée dynamiquement une liste d’agents IA spécialisés (coWorkers) selon les expertises données
 * @param {string[]} expertises - Liste des expertises requises (ex: "juridique", "stratégie", "excel")
 * @param {string} objective - Objectif global utilisateur
 * @param {object|null} context - Contexte enrichi optionnel (résumé + éléments clés)
 * @returns {Promise<Agent[]>}
 */
export async function createAgentsFromExpertises(
  userId,
  expertises,
  objective,
  context = null
) {
  // console.info('createAgentsFromExpertises', {
  //   expertises,
  //   objective,
  //   context,
  // });

  if (!Array.isArray(expertises) || expertises.length === 0) {
    throw new Error('Aucune expertise fournie à AgentFactory');
  }

  const tokenUsages = [];

  const agents = await Promise.all(
    expertises.map(async (expertise, index) => {
      // const userPrompt = buildUserPromptForAgent(expertise);
      const systemPromptRequest = generatePromptForExpertise(
        objective,
        expertise,
        context
      );

      const messages = [
        { role: 'system', content: SYSTEM_MESSAGE },
        { role: 'user', content: systemPromptRequest },
      ];

      const iaRequest = {
        userId,
        messages,
        ...DEFAULT_IA_MODEL,
      };

      const {
        result: { system, user },
        tokenUsage,
      } = await callModelAndExtract(iaRequest);

      tokenUsages.push(tokenUsage);

      const agentId = `agent-${index + 1}-${expertise.toLowerCase().replace(/\s+/g, '-')}`;

      return {
        id: agentId,
        name: `Agent ${expertise}`,
        role: 'coWorker',
        expertise,
        systemPrompt: system,
        userPrompt: user,
        tools: inferToolsForExpertise(expertise),
        memory: {
          context: {
            objective,
            summary: context?.summary || null,
            keyElements: context?.keyElements || [],
          },
          history: [],
          inputs: [],
          outputs: [],
        },
        status: 'idle',
      };
    })
  );

  console.info('✅ Agents générés avec prompts :', agents);
  return { agents, tokenUsages };
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
