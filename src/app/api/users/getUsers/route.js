import fs from 'fs/promises';
import path from 'path';
import { withAuth } from '../../auth/withAuth';

const filePath = path.resolve('data/users.json');

export async function GET(request) {
  return await withAuth(request, async (userId) => {
    try {
      const fileContent = await fs.readFile(filePath, 'utf8');
      const users = JSON.parse(fileContent);

      // 🔐 On ne retourne que l'utilisateur connecté, pour éviter d'exposer tous les comptes
      const currentUser = users.find((u) => u.id === userId);
      if (!currentUser) {
        return new Response(
          JSON.stringify({ error: 'Utilisateur non trouvé' }),
          { status: 404 }
        );
      }

      // ✅ On retourne uniquement les infos publiques de l'utilisateur
      return new Response(
        JSON.stringify({
          id: currentUser.id,
          username: currentUser.username,
        }),
        { status: 200 }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({
          error: 'Erreur lors de la récupération des utilisateurs',
          message: error.message,
        }),
        { status: 500 }
      );
    }
  });
}
