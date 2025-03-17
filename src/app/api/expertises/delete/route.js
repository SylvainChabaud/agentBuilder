import fs from 'fs';
import path from 'path';

const filePath = path.resolve('data/expertises.json');

export async function DELETE(request) {
  console.info('DELETE', request);

  try {
    const { expertId } = await request.json();
    console.info('response', expertId);
    // const { expertId } = await request.json();

    if (!expertId) {
      return new Response(JSON.stringify({ error: 'expertId manquant' }), {
        status: 400,
      });
    }

    let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Supprimer la connexion correspondant à expertId
    data = data.filter((conn) => conn.id !== expertId);

    console.info('DELETE 3', data);

    // Écrire les données mises à jour dans le fichier JSON
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Erreur lors de la suppression de l'expertise",
      }),
      { status: 500 }
    );
  }
}
