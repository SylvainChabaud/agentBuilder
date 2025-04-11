// lib/ia/agents/analystAgent.js

import { DEFAULT_IA_MODEL } from '../constants';
import {
  OBJECTIVE_ANALYSIS_PROMPT,
  SYSTEM_MESSAGE,
} from '../expertPrompts/analyzeObjective';
import { callModelAndExtract } from '../lib/callModel';

// const outputSchema = {
//   tasks: [{ name: 'string', description: 'string', priority: 'string' }],
//   expertises: ['string'],
// };

/**
 * Appelle un modèle IA pour analyser un objectif et retourner une structure exploitable
 * @param {Object} params
 * @param {string} params.objective - Objectif exprimé en langage naturel
 * @param {string[]} [params.context] - Données contextuelles supplémentaires (summary, keys)
 * @returns {Promise<{ tasks: Task[], expertises: string[] }>}
 */

export const analyzeObjective = async ({ objective, context = [] }) => {
  // console.info('analyzeObjective', { objective, context });

  const messages = [
    { role: 'system', content: SYSTEM_MESSAGE },
    { role: 'user', content: OBJECTIVE_ANALYSIS_PROMPT(objective, context) },
  ];

  const iaRequest = {
    messages,
    ...DEFAULT_IA_MODEL,
  };

  const {
    result: { tasks, expertises, customObjective },
    tokenUsage,
  } = await callModelAndExtract(iaRequest);

  console.info('analyzeObjective output', {
    tasks,
    expertises,
    customObjective,
  });

  return { tasks, expertises, customObjective, tokenUsage };
};
