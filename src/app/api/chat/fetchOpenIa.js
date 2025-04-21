import OpenAI from 'openai';
// import { getLlmSettings } from './utils';

export const fetchOpenIa = async ({ userId, messages, config }) => {
  console.info('🧠 fetchOpenIa', { userId, messages, config });

  // const config = await getLlmSettings(userId);

  if (!config) {
    throw new Error(
      'Impossible de récupérer les paramètres IA pour cet utilisateur.'
    );
  }

  const { apiKey, baseUrl, model } = config;

  const client = new OpenAI({ apiKey, baseURL: baseUrl });

  try {
    const completion = await client.chat.completions.create({
      model,
      messages,
      // response_format: { type: 'json_object' },
    });

    const assistantResponse = completion?.choices[0];
    const usage = completion?.usage;

    const tokenUsage = {
      userTokens: usage?.prompt_tokens,
      assistantTokens: usage?.completion_tokens,
      totalTokens: usage?.total_tokens,
    };

    return {
      data: assistantResponse,
      tokenUsage,
      error: null,
    };
  } catch (error) {
    console.error('❌ Erreur dans fetchOpenIa :', error);
    return {
      data: [],
      tokenUsage: null,
      error: error.message,
    };
  }
};
