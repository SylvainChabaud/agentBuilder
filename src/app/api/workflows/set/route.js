import fs from 'fs';
import path from 'path';

const filePath = path.resolve('data/workflows.json');

export async function POST(request) {
  console.info('POST WORFLOWS SAVE 1', filePath);

  const { workflow } = await request.json();
  console.info('POST WORFLOWS SAVE 2', workflow);

  if (!workflow) {
    return new Response(JSON.stringify({ error: 'Paramètres manquants' }), {
      status: 400,
    });
  }

  try {
    console.info('POST WORFLOWS SAVE 3', { workflow, filePath });

    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    console.info('POST WORFLOWS SAVE 3bis', data);

    const isValidArray = Array.isArray(data); // Vérifie si data est bien un tableau
    const isEmpty = isValidArray && data.length === 0;
    const nextId = isEmpty
      ? 0
      : isValidArray && data[data.length - 1]?.id !== undefined
        ? data[data.length - 1].id + 1
        : 0;

    console.info('POST WORKFLOWS SAVE 4', { data, nextId });

    // Ajouter la nouvelle connexion
    data.push({ id: nextId, ...workflow });

    console.info('POST WORFLOWS SAVE 5', data);

    // Écrire dans le fichier
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Erreur lors de la sauvegarde du workflow' }),
      { status: 500 }
    );
  }
}
