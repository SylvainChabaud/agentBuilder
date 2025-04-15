import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const deepseek = new OpenAI({
  baseURL: process.env.DEEPSEEK_URL,
  apiKey: process.env.DEEPSEEK_API_KEY,
});

export const fetchOpenIa = async ({ model, messages }) => {
  console.info('fetchOpenIa', { model, messages });

  try {
    const completion = await deepseek.chat.completions.create({
      model,
      messages,
      response_format: { type: 'json_object' },
    });

    console.info('deepseekResponse', completion);

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
    console.error('Erreur dans fetchDeepseek :', error);
    return {
      data: [],
      error: error.message,
    };
  }
};
