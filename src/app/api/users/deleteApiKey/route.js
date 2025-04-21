// src/app/api/users/deleteApiKey/route.js

import fs from 'fs/promises';
import path from 'path';

const USERS_FILE = path.resolve('data/users.json');

export async function POST(request) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return new Response(JSON.stringify({ error: 'userId manquant' }), {
        status: 400,
      });
    }

    const content = await fs.readFile(USERS_FILE, 'utf-8');
    const users = JSON.parse(content);

    const index = users.findIndex((u) => u.id === userId);
    if (index === -1) {
      return new Response(
        JSON.stringify({ error: 'Utilisateur introuvable' }),
        { status: 404 }
      );
    }

    // Vider les champs de llmSettings proprement
    users[index].llmSettings = {
      apiKey: '',
      baseUrl: '',
      model: '',
    };

    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Erreur serveur : ' + err.message }),
      { status: 500 }
    );
  }
}
