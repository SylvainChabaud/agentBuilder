// lib/ia/agents/analystAgent.js

import { callModelAndExtract } from '../lib/callModel';

const SYSTEM_MESSAGE =
  'Tu es un agent analyste IA, spécialisé dans la décomposition logique.';

const OBJECTIVE_ANALYSIS_PROMPT = (
  objective
) => `Tu es un agent analyste. Voici un objectif utilisateur : "${objective}"
À partir de cet objectif, déduis : 1. Une liste de sous-tâches intelligentes (Tasks[{}]), chacune avec un nom, une description claire et un niveau de priorité. 2. Les expertises nécessaires pour traiter ces tâches (array de string)
Format de réponse attendu (JSON uniquement) : { "tasks": [{ "name": "string", "description": "string", "priority": "low" | "medium" | "high" }, ...], "expertises": ["string"] }`;

const outputSchema = {
  tasks: [{ name: 'string', description: 'string', priority: 'string' }],
  expertises: ['string'],
};

/**
 * Appelle un modèle IA pour analyser un objectif et retourner une structure exploitable
 * @param {Object} params
 * @param {string} params.objective - Objectif exprimé en langage naturel
 * @param {string[]} [params.context] - Données contextuelles supplémentaires (textes, extraits...)
 * @returns {Promise<{ tasks: Task[], expertises: string[] }>}
 */

export const analyzeObjective = async ({ objective, context = [] }) => {
  console.info('analyzeObjective', { objective, context });

  const messages = [
    { role: 'system', content: SYSTEM_MESSAGE },
    { role: 'user', content: OBJECTIVE_ANALYSIS_PROMPT(objective) },
  ];

  const iaRequest = {
    messages,
    model: 'deepseek/deepseek-r1-distill-llama-70b:free',
    isOpenRouter: true,
  };

  const {
    result: { tasks, expertises },
  } = await callModelAndExtract(iaRequest, outputSchema);

  console.info('output', { tasks, expertises });

  return { tasks, expertises };
};
