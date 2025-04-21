// lib/ia/callModelAndExtract.js

import { fetchOpenRouter } from '../../../../../lib/services/openRouter/fetchOpenRouter';
// import { fetchOpenIa } from '../../../../../lib/services/openIa/fetchOpenIa';
// import { extractObject } from '../../../agentBuilder/components/run/utils';
import { fetchOllama } from '../../../../../lib/services/ollama/fetchOllama';
import { MODEL_SOURCES } from 'app/constants';
import { openIaWrapper } from '../../chat/openIaWrapper';

/**
 * Appelle un modèle IA avec un jeu de messages et extrait un objet JSON propre.
 * @param {Object} params
 * @param {Array<{ role: 'user' | 'system' | 'assistant', content: string }>} params.messages
 * @param {string} params.model - Nom du modèle à utiliser (Ollama, GPT, DeepSeek...)
 * @param {boolean} params.modelSource - Indique si l’appel passe par OpenRouter
 * @param {string[]} expectedKeys - Liste des clés attendues dans l’objet retourné
 * @returns {Promise<Object>} - Objet JSON parsé avec les clés extraites
 */
export async function callModelAndExtract({
  userId,
  messages,
  model,
  modelSource = MODEL_SOURCES.OLLAMA,
}) {
  if (!messages || !model) {
    return NextResponse.json(
      { error: 'Paramètres manquants' },
      { status: 400 }
    );
  }
  console.info('callModelAndExtract', { model, messages, modelSource });

  let fetchFunc;
  switch (modelSource) {
    case MODEL_SOURCES.OPEN_ROUTER:
      fetchFunc = fetchOpenRouter;
      break;
    case MODEL_SOURCES.OLLAMA:
      fetchFunc = fetchOllama;
      break;
    case MODEL_SOURCES.OPEN_IA:
      fetchFunc = openIaWrapper;
      break;
    default:
      throw new Error(`Source du modèle IA inconnue: ${modelSource}`);
  }
  const { data, tokenUsage } = await fetchFunc({ userId, model, messages });

  // console.info('contentWithoutThink 1 ', data);

  const content = data?.message?.content || '';

  console.info('contentWithoutThink 2 ', content);

  const contentWithoutThink = content
    .replace(/<think>[\s\S]*?<\/think>/g, '')
    .trim();

  console.info('contentWithoutThink 3', contentWithoutThink);

  // const contentObject = extractObject(content, expectedKeys);
  const cleaned = contentWithoutThink
    .replace(/```json/g, '') // supprime les balises markdown éventuelles
    .replace(/```/g, '') // supprime la fermeture
    .trim();

  console.info('contentWithoutThink 3 bis', cleaned);

  const parsed = cleaned && JSON.parse(cleaned);

  console.info('callModelAndExtract OUTPUT', parsed);

  return { result: parsed, tokenUsage };
}
