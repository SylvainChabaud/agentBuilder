import dotenv from 'dotenv';

dotenv.config();

export const fetchOllama = async ({ model, messages }) => {
  console.info('fetchOllama', { model, messages });
  try {
    const ollamaResponse = await fetch(process.env.OLLAMA_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages,
        stream: false,
      }),
    });

    console.info('ollamaResponse', ollamaResponse);

    if (!ollamaResponse.ok) {
      throw new Error(`Erreur Ollama: ${ollamaResponse.status}`);
    }

    const chatOutput = await ollamaResponse.json();

    return { data: chatOutput, error: null };
  } catch (error) {
    console.error('Erreur dans fetchOllama :', error);
    return { data: [], error: error.message };
  }
};
