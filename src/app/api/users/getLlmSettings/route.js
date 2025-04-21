import fs from 'fs/promises';
import path from 'path';
import { decrypt } from '/lib/utils/encryption';

const USERS_FILE = path.resolve('data/users.json');

export async function POST(request) {
  console.info('getLlmSettings POST');
  try {
    const { userId } = await request.json();
    console.info('getLlmSettings userId', userId);

    if (!userId) {
      return new Response(JSON.stringify({ error: 'userId manquant' }), {
        status: 400,
      });
    }

    const content = await fs.readFile(USERS_FILE, 'utf-8');
    const users = JSON.parse(content);
    const user = users.find((u) => u.id === userId);

    if (
      !user?.llmSettings?.apiKey ||
      !user.llmSettings.baseUrl ||
      !user.llmSettings.model
    ) {
      return new Response(
        JSON.stringify({ error: 'Configuration IA incomplète.' }),
        {
          status: 400,
        }
      );
    }

    const decryptedApiKey = decrypt(user.llmSettings.apiKey);

    return new Response(
      JSON.stringify({
        apiKey: decryptedApiKey,
        baseUrl: user.llmSettings.baseUrl,
        model: user.llmSettings.model,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur récupération config IA :', error);
    return new Response(JSON.stringify({ error: 'Erreur serveur' }), {
      status: 500,
    });
  }
}
