import OpenAI from 'openai';

export async function POST(request) {
  try {
    const body = await request.json();
    const { apiKey, baseURL, model } = body;

    const client = new OpenAI({ apiKey, baseURL });

    const result = await client.chat.completions.create({
      model,
      messages: [{ role: 'user', content: 'Hello' }],
      max_tokens: 5,
    });

    return new Response(
      JSON.stringify({
        success: true,
        preview: result.choices[0].message,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
