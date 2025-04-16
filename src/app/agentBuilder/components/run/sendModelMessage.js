import { MODELS } from 'src/app/chatInterface/constants';
import { getIaContext, getIaPrompt } from './contracts/contracts';
import { extractObject } from './utils';

export const sendModelMessage = async ({ input, node, expertisesList }) => {
  console.info('sendModelMessage', {
    input,
    node,
  });

  const results = [];

  for (const modelOutput of input) {
    const messages = modelOutput.data;
    const messagesSource = modelOutput.id;
    const arrayAppSource = messagesSource.split('-');
    const expertiseSource = arrayAppSource[1];
    const currentExpertise = node.expertise;
    // const isMixerEnabled = node.isMixerEnabled;

    console.info('node.app', node);

    // if (isMixerEnabled) {

    // }
    const foundedExpertise = expertisesList.find(
      ({ id }) => id === expertiseSource
    );

    const inputs = foundedExpertise?.outputs || {};

    console.info('node.app 1', { currentExpertise, inputs, expertisesList });

    const {
      outputs = {},
      context = [],
      model = MODELS[1].model,
    } = expertisesList.find(({ id }) => id === currentExpertise);

    console.info('node.app 2', outputs);

    console.info('node.app 3', {
      currentApp: node.app,
      node,
      expertisesList,
      expertiseSource,
      currentExpertise,
      context,
      outputs,
      model,
    });

    const { model: iaModel, modelSource } = MODELS.find(
      ({ id }) => id === model
    );

    console.info('input', input);

    console.info('messages', {
      expertiseSource,
      expertisesList,
      iaModel,
      messages,
    });

    // Exécuter en série un appel fetch pour chaque élément de l'input
    for (const item of messages) {
      // const isFromExpertiseSheets = expertiseSource === 'sheets';
      const formattedItem = getIaPrompt({
        data: item,
        inputs,
      });

      // const formattedInputs = isFromExpertiseSheets ? item : inputs;
      console.info('formattedItem', { item, formattedItem });

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

      console.info('newContext', newContext);

      // Utiliser l'élément courant comme contenu du message
      const newMessage = [
        ...newContext,
        {
          role: 'user',
          content: formattedItem || 'GO',
          timestamp: new Date(),
        },
      ];

      console.info('POST IA', {
        context,
        newMessage,
        last: newMessage,
      });

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessage,
          model: iaModel,
          modelSource,
        }),
      });

      const { message, error } = await res.json();
      if (!res.ok) {
        throw new Error(error || 'Erreur lors de l’analyse par le model.');
      }
      let iaContent = (message && message.content) || '';

      // // Supprimer les balises <think>...</think> si présentes
      iaContent = iaContent.replace(/<think>[\s\S]*?<\/think>/g, '').trim();

      // // const iaContentObj = extractObject(iaContent, outputs);

      // console.info('sendModelMessage 3', iaContent);

      // // const contentObject = extractObject(content, expectedKeys);

      console.info('Original content:', iaContent);

      // Nettoyer les caractères de contrôle comme les retours à la ligne, tabulations, etc.
      const iaContentObj = safeParseOrExtract(iaContent, outputs);

      console.info('Parsed JSON object:', iaContentObj);

      results.push(iaContentObj);
    }
  }

  console.info('results sendModelMessage', results);

  return results;
};

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
