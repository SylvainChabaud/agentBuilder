import fs from 'fs/promises';
import path from 'path';
import { withAuth } from '../../auth/withAuth';

export async function GET(request) {
  return await withAuth(request, async (userId) => {
    const filePath = path.resolve('data/users', userId, 'connections.json');

    console.info('📁 Lecture du fichier:', filePath);

    try {
      const fileContent = await fs.readFile(filePath, 'utf8');

      console.info('✅ fileContent', fileContent);

      // Si le fichier est vide, JSON.parse va planter, donc on sécurise :
      if (!fileContent.trim()) {
        console.warn('⚠️ Fichier vide, retour d’un tableau vide');
        return new Response(JSON.stringify([]), { status: 200 });
      }

      const data = JSON.parse(fileContent);
      console.info('✅ Données chargées:', data);

      return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.warn('📂 Fichier non trouvé, retour tableau vide');
        return new Response(JSON.stringify([]), { status: 200 });
      }

      console.error('❌ Erreur inattendue:', error);
      return new Response(
        JSON.stringify({
          error: 'Erreur lors de la récupération des connexions',
          message: error.message,
        }),
        { status: 500 }
      );
    }
  });
}
