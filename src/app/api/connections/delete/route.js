import fs from 'fs';
import path from 'path';

const filePath = path.resolve('data/connections.json');

export async function DELETE(request) {
  try {
    const { appId } = await request.json();

    if (!appId) {
      return new Response(JSON.stringify({ error: 'AppId manquant' }), {
        status: 400,
      });
    }

    let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Supprimer la connexion correspondant à appId
    data = data.filter((conn) => conn.appId !== appId);

    // Écrire les données mises à jour dans le fichier JSON
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: 'Erreur lors de la suppression de la connexion',
      }),
      { status: 500 }
    );
  }
}
