import fs from 'fs/promises';
import path from 'path';
import { withAuth } from '../../auth/withAuth';

export async function DELETE(request) {
  return await withAuth(request, async (userId) => {
    console.info('DELETE EXPERTISE', { userId });

    try {
      const { expertId } = await request.json();
      if (!expertId) {
        return new Response(JSON.stringify({ error: 'expertId manquant' }), {
          status: 400,
        });
      }

      const userDir = path.resolve('data/users', userId);
      const filePath = path.join(userDir, 'expertises.json');

      let data = [];
      try {
        const fileContent = await fs.readFile(filePath, 'utf8');
        data = JSON.parse(fileContent);
      } catch {
        // Le fichier n'existe pas ou est vide, rien à supprimer
        return new Response(
          JSON.stringify({
            success: false,
            message: 'Aucune expertise trouvée',
          }),
          { status: 404 }
        );
      }

      // Supprimer l’expertise avec l’ID donné
      const updatedData = data.filter((exp) => exp.id !== expertId);
      await fs.writeFile(filePath, JSON.stringify(updatedData, null, 2));

      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
      return new Response(
        JSON.stringify({
          error: "Erreur lors de la suppression de l'expertise",
          message: error.message,
        }),
        { status: 500 }
      );
    }
  });
}
