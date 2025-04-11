import dotenv from 'dotenv';

dotenv.config();

export async function POST(req) {
  const {
    prompt,
    model = 'mistralai/mistral-small-24b-instruct-2501:free',
    max_tokens = 500,
  } = await req.json();

  const response = await fetch(process.env.OPEN_ROUTER_URL, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + process.env.OPEN_ROUTER_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'user', content: prompt }],
      // max_tokens, // TODO
      stream: false,
    }),
  });

  const data = await response.json();
  return Response.json(data);
}
