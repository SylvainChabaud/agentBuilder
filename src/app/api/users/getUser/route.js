// src/app/api/users/getUser/route.js

import fs from 'fs/promises';
import path from 'path';

const USERS_FILE = path.resolve('data/users.json');

export async function POST(request) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return new Response(JSON.stringify({ error: 'ID manquant' }), {
        status: 400,
      });
    }

    const data = await fs.readFile(USERS_FILE, 'utf8');
    const users = JSON.parse(data);
    const user = users.find((u) => u.id === userId);

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Utilisateur introuvable' }),
        { status: 404 }
      );
    }

    const hasKey = !!user.llmSettings?.apiKey;

    return new Response(
      JSON.stringify({
        id: user.id,
        username: user.username,
        permission: user.permission,
        llmSettings: {
          hasKey,
          baseUrl: user.llmSettings?.baseUrl || '',
          model: user.llmSettings?.model || '',
        },
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erreur serveur' }), {
      status: 500,
    });
  }
}
