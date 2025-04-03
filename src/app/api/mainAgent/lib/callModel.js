// lib/ia/callModelAndExtract.js

import { fetchOpenRouter } from 'lib/services/openRouter/fetchOpenRouter';
// import { extractObject } from '../../../agentBuilder/components/run/utils';
import { fetchOllama } from 'lib/services/ollama/fetchOllama';

/**
 * Appelle un modèle IA avec un jeu de messages et extrait un objet JSON propre.
 * @param {Object} params
 * @param {Array<{ role: 'user' | 'system' | 'assistant', content: string }>} params.messages
 * @param {string} params.model - Nom du modèle à utiliser (Ollama, GPT, DeepSeek...)
 * @param {boolean} params.isOpenRouter - Indique si l’appel passe par OpenRouter
 * @param {string[]} expectedKeys - Liste des clés attendues dans l’objet retourné
 * @returns {Promise<Object>} - Objet JSON parsé avec les clés extraites
 */
export async function callModelAndExtract(
  { messages, model, isOpenRouter = true },
  expectedKeys = []
) {
  if (!messages || !model) {
    return NextResponse.json(
      { error: 'Paramètres manquants' },
      { status: 400 }
    );
  }
  console.info('callModelAndExtract', { model, messages });

  const fetchFunc = isOpenRouter ? fetchOpenRouter : fetchOllama;
  const { data } = await fetchFunc({ model, messages });

  console.info('contentWithoutThink 1 ', data);

  const content = data?.message?.content || '';

  console.info('contentWithoutThink 2 ', content);

  const contentWithoutThink = content
    .replace(/<think>[\s\S]*?<\/think>/g, '')
    .trim();

  console.info('contentWithoutThink 3', contentWithoutThink);

  //   const contentObject = extractObject(content, expectedKeys);
  const cleaned = content
    .replace(/```json/g, '') // supprime les balises markdown éventuelles
    .replace(/```/g, '') // supprime la fermeture
    .trim();

  const parsed = cleaned && JSON.parse(cleaned);

  console.info('contentWithoutThink 3', parsed);

  return { result: parsed };
}
