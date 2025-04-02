import fs from 'fs/promises';
import path from 'path';
import { withAuth } from '../../auth/withAuth';

export async function POST(request) {
  return await withAuth(request, async (userId) => {
    const userDir = path.resolve('data/users', userId);
    const filePath = path.join(userDir, 'expertises.json');

    try {
      // 🔐 Crée le dossier utilisateur si nécessaire
      await fs.mkdir(userDir, { recursive: true });

      const { expertise } = await request.json();
      if (!expertise) {
        return new Response(JSON.stringify({ error: 'Paramètres manquants' }), {
          status: 400,
        });
      }

      let data = [];
      try {
        const fileContent = await fs.readFile(filePath, 'utf8');
        data = JSON.parse(fileContent);
      } catch {
        data = [];
      }

      data.push(expertise);

      await fs.writeFile(filePath, JSON.stringify(data, null, 2));

      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
      return new Response(
        JSON.stringify({
          error: "Erreur lors de la sauvegarde de l'expertise",
          message: error.message,
        }),
        { status: 500 }
      );
    }
  });
}
