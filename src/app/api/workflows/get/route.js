import fs from 'fs/promises';
import path from 'path';
import { withAuth } from '../../auth/withAuth';

export async function GET(request) {
  return await withAuth(request, async (userId) => {
    const userDir = path.resolve('data/users', userId);
    const filePath = path.join(userDir, 'workflows.json');

    try {
      const fileContent = await fs.readFile(filePath, 'utf8');
      const data = JSON.parse(fileContent);
      return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
      return new Response(
        JSON.stringify({
          error: 'Erreur lors de la récupération des workflows',
          message: error.message,
        }),
        { status: 500 }
      );
    }
  });
}
