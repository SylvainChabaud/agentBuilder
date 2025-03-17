import fs from 'fs';
import path from 'path';

const filePath = path.resolve('data/connections.json');

export async function POST(request) {
  console.info('POST CONNECTIONS SAVE 1');

  const { appId, accessToken } = await request.json();
  console.info('POST CONNECTIONS SAVE 2', { appId, accessToken });

  if (!appId || !accessToken) {
    return new Response(JSON.stringify({ error: 'Paramètres manquants' }), {
      status: 400,
    });
  }

  try {
    console.info('POST CONNECTIONS SAVE 3', { appId, accessToken });

    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    console.info('POST CONNECTIONS SAVE 4', data);

    // Ajouter la nouvelle connexion
    data.push({ appId, accessToken, timestamp: Date.now() });

    // Écrire dans le fichier
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Erreur lors de la sauvegarde de la connexion' }),
      { status: 500 }
    );
  }
}
