import fs from 'fs/promises';
import path from 'path';
import { withAuth } from '../../auth/withAuth';

export async function DELETE(request) {
  return await withAuth(request, async (userId) => {
    try {
      const { workflowId } = await request.json();

      if (workflowId === undefined || workflowId === null) {
        return new Response(JSON.stringify({ error: 'workflowId manquant' }), {
          status: 400,
        });
      }

      const userDir = path.resolve('data/users', userId);
      const filePath = path.join(userDir, 'workflows.json');

      let data = [];
      try {
        const fileContent = await fs.readFile(filePath, 'utf8');
        data = JSON.parse(fileContent);
      } catch {
        return new Response(
          JSON.stringify({ error: 'Aucun workflow à supprimer' }),
          { status: 404 }
        );
      }

      const updatedData = data.filter((conn) => conn.id !== workflowId);

      await fs.writeFile(filePath, JSON.stringify(updatedData, null, 2));

      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
      return new Response(
        JSON.stringify({
          error: 'Erreur lors de la suppression du workflow',
          message: error.message,
        }),
        { status: 500 }
      );
    }
  });
}
