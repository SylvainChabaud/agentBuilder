import fs from 'fs';
import path from 'path';

const filePath = path.resolve('data/expertises.json');

export async function POST(request) {
  console.info('POST EXPERTISES SAVE 1');

  const { expertise } = await request.json();
  console.info('POST EXPERTISES SAVE 2', expertise);

  if (!expertise) {
    return new Response(JSON.stringify({ error: 'Paramètres manquants' }), {
      status: 400,
    });
  }

  try {
    console.info('POST EXPERTISES SAVE 3', expertise);

    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    console.info('POST EXPERTISES SAVE 4', data);

    // Ajouter la nouvelle connexion
    data.push(expertise);

    // Écrire dans le fichier
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Erreur lors de la sauvegarde de l'expertise" }),
      { status: 500 }
    );
  }
}
