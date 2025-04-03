import dotenv from 'dotenv';

dotenv.config();

export const fetchOpenRouter = async (iaParams) => {
  console.info('fetchOpenRouter 123', iaParams);
  const { model, messages, max_tokens } = iaParams;

  try {
    const openRouterResponse = await fetch(process.env.OPEN_ROUTER_URL, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + process.env.OPEN_ROUTER_API_KEY, // Stocker la clé en variable d'env
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        // messages: [{ role: 'user', content: prompt }],
        messages,
        max_tokens,
        stream: false,
      }),
    });

    console.info('openRouterResponse 456', openRouterResponse);

    if (!openRouterResponse.ok) {
      throw new Error(`Erreur OpenRouter: ${openRouterResponse.status}`);
    }

    const chatOutput = await openRouterResponse.json();

    console.info('chatOutput', chatOutput);

    const data = chatOutput.choices?.[0] || 'Aucune réponse.';

    return { data, error: null };
  } catch (error) {
    console.error('Erreur dans OpenRouter :', error);
    return { data: [], error: error.message };
  }
};
