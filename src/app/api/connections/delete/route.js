import fs from 'fs/promises';
import path from 'path';
import { withAuth } from '../../auth/withAuth';

export async function DELETE(request) {
  return await withAuth(request, async (userId) => {
    const userDir = path.resolve('data/users', userId);
    const filePath = path.join(userDir, 'connections.json');

    try {
      const { appId } = await request.json();

      if (!appId) {
        return new Response(JSON.stringify({ error: 'AppId manquant' }), {
          status: 400,
        });
      }

      // 🔐 S'assurer que le dossier utilisateur existe
      await fs.mkdir(userDir, { recursive: true });

      let data = [];
      try {
        const fileContent = await fs.readFile(filePath, 'utf8');
        data = JSON.parse(fileContent);
      } catch (err) {
        // Aucun fichier, donc aucune connexion à supprimer
        return new Response(
          JSON.stringify({ error: 'Aucune connexion trouvée' }),
          { status: 404 }
        );
      }

      const updatedData = data.filter((conn) => conn.appId !== appId);

      await fs.writeFile(filePath, JSON.stringify(updatedData, null, 2));

      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
      return new Response(
        JSON.stringify({
          error: 'Erreur lors de la suppression de la connexion',
          message: error.message,
        }),
        { status: 500 }
      );
    }
  });
}
