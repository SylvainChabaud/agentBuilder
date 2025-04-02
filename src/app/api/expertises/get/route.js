import fs from 'fs/promises';
import path from 'path';
import { withAuth } from '../../auth/withAuth';

export async function GET(request) {
  return await withAuth(request, async (userId) => {
    const userDir = path.resolve('data/users', userId);
    const filePath = path.join(userDir, 'expertises.json');

    try {
      let data = [];

      try {
        const fileContent = await fs.readFile(filePath, 'utf8');
        data = JSON.parse(fileContent);
      } catch {
        // Fichier vide ou inexistant, retourne tableau vide
        data = [];
      }

      return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
      return new Response(
        JSON.stringify({
          error: 'Erreur lors de la récupération des expertises',
          message: error.message,
        }),
        { status: 500 }
      );
    }
  });
}
