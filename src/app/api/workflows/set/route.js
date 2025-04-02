import fs from 'fs/promises';
import path from 'path';
import { withAuth } from '../../auth/withAuth';

export async function POST(request) {
  return await withAuth(request, async (userId) => {
    const userDir = path.resolve('data/users', userId);
    const filePath = path.join(userDir, 'workflows.json');

    console.info('POST userId', { userId, filePath });

    try {
      // 🔐 Crée le dossier utilisateur si nécessaire
      await fs.mkdir(userDir, { recursive: true });

      const { workflow } = await request.json();

      console.info('workflow', workflow);

      if (!workflow) {
        return new Response(JSON.stringify({ error: 'Paramètres manquants' }), {
          status: 400,
        });
      }

      // 📂 Lecture et parsing du fichier
      let data = [];
      try {
        const fileContent = await fs.readFile(filePath, 'utf8');
        data = JSON.parse(fileContent);
      } catch {
        data = [];
      }

      // 🔢 Attribution d’un ID unique dans le tableau
      const nextId =
        Array.isArray(data) && data.length ? data[data.length - 1].id + 1 : 0;

      // ✅ Ajout du workflow
      data.push({ id: nextId, ...workflow });
      await fs.writeFile(filePath, JSON.stringify(data, null, 2));

      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
      return new Response(
        JSON.stringify({
          error: 'Erreur lors de la sauvegarde du workflow',
          message: error.message,
        }),
        { status: 500 }
      );
    }
  });
}
