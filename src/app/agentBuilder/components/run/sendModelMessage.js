import { MODELS } from 'src/app/chatInterface/constants';
import { getIaContext, getIaPrompt } from './contracts/contracts';
import { extractObject } from './utils';

/**
 * Fonction principale pour envoyer un message au modèle
 */
export const sendModelMessage = async ({
  userId,
  input,
  node,
  expertisesList,
}) => {
  console.info('sendModelMessage', { userId, input, node });

  const results = [];

  try {
    for (const modelOutput of input) {
      const messages = modelOutput.data;
      const messagesSource = modelOutput.id;
      const arrayAppSource = messagesSource.split('-');
      const expertiseSource = arrayAppSource[1];
      const currentExpertise = node.expertise;

      console.info('node.app', node);

      const foundedExpertise = expertisesList.find(
        ({ id }) => id === expertiseSource
      );

      const inputs = foundedExpertise?.outputs || {};

      console.info('node.app 1', { currentExpertise, inputs, expertisesList });

      const {
        outputs = {},
        context = [],
        model = MODELS[0].model,
      } = expertisesList.find(({ id }) => id === currentExpertise);

      const { model: iaModel, modelSource } = MODELS.find(
        ({ id }) => id === model
      );

      // Boucle pour traiter chaque message
      for (const item of messages) {
        const formattedItem = getIaPrompt({
          data: item,
          inputs,
        });

        const contextInputs =
          inputs && Object.keys(inputs).length
            ? inputs
            : Object.fromEntries(
                Object.entries(item).map(([key]) => [key, 'string'])
              );

        const newContext = getIaContext({
          context,
          inputs: formattedItem ? contextInputs : '',
          outputs,
        });

        const newMessage = [
          ...newContext,
          {
            role: 'user',
            content: formattedItem || 'GO',
            timestamp: new Date(),
          },
        ];

        try {
          // Appel à l'API
          const res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userId,
              messages: newMessage,
              model: iaModel,
              modelSource,
            }),
          });

          const { message, error } = await res.json();
          if (!res.ok) {
            throw new Error(error || 'Erreur lors de l’analyse par le modèle.');
          }

          // Traitement du contenu du message
          let iaContent = message?.content || '';
          iaContent = iaContent.replace(/<think>[\s\S]*?<\/think>/g, '').trim();

          // Essayer de parser le contenu en objet JSON
          const iaContentObj = safeParseOrExtract(iaContent, outputs);
          results.push(iaContentObj);
        } catch (err) {
          // Gestion spécifique des erreurs d'API
          console.error(
            "Erreur lors de l'envoi du message au modèle:",
            err.message
          );
          throw new Error(
            `Erreur dans l'envoi du message au modèle IA: ${err.message}`
          );
        }
      }
    }
  } catch (err) {
    // Gestion des erreurs générales
    console.error('Erreur lors de l’envoi du message au modèle:', err.message);
    throw new Error(`Erreur dans sendModelMessage: ${err.message}`);
  }

  console.info('results sendModelMessage', results);
  return results;
};

/**
 * Fonction pour traiter les données JSON ou effectuer un fallback
 */
export function safeParseOrExtract(text, outputs = []) {
  let cleaned = text
    .replace(/```json/g, '')
    .replace(/```/g, '')
    .replace(/[\x00-\x1F\x7F]/g, '')
    .replace(/[\u2018\u2019\u201C\u201D]/g, "'")
    .replace(/\\n/g, '\n')
    .replace(/\\u[\dA-Fa-f]{4}/g, '')
    .replace(/[\u4e00-\u9fa5\u3040-\u309F\u30A0-\u30FF\uac00-\ud7af]/g, '')
    .trim();

  try {
    return cleaned ? JSON.parse(cleaned) : {};
  } catch (e) {
    console.warn('⚠️ JSON.parse() échoué, fallback extractObject');
    return extractObject(cleaned, outputs);
  }
}
