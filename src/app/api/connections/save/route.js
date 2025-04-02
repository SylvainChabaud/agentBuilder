import fs from 'fs/promises';
import path from 'path';
import { withAuth } from '../../auth/withAuth';

export async function POST(request) {
  console.info('🔐 Authentifié avec userId:');

  return await withAuth(request, async (userId) => {
    console.info('🔐 Authentifié avec userId:', userId);

    const userDir = path.resolve('data/users', userId);
    const filePath = path.join(userDir, 'connections.json');

    console.info('🔐 Authentifié avec userId: 12', { userDir, filePath });

    try {
      const { appId, accessToken } = await request.json();
      console.info('📩 Données reçues:', { appId, accessToken });

      if (!appId || !accessToken) {
        return new Response(JSON.stringify({ error: 'Paramètres manquants' }), {
          status: 400,
        });
      }

      console.info('📩 Données reçues:  999');

      await fs.mkdir(userDir, { recursive: true });

      console.info('📩 Données reçues:  999999');

      let data = [];
      try {
        const fileContent = await fs.readFile(filePath, 'utf8');
        console.info('📩 fileContent 23', fileContent);

        if (fileContent.trim()) {
          data = JSON.parse(fileContent);
        }
      } catch (err) {
        console.warn('📂 Nouveau fichier, initialisation vide');
      }

      console.info('📩 fileContent 34', data);

      data.push({ appId, accessToken, timestamp: Date.now() });
      console.info('📩 fileContent 45', data);

      await fs.writeFile(filePath, JSON.stringify(data, null, 2));
      console.info('✅ Connexion ajoutée');

      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
      console.error('❌ Erreur serveur:', error);
      return new Response(
        JSON.stringify({
          error: 'Erreur lors de la sauvegarde de la connexion',
          message: error.message,
        }),
        { status: 500 }
      );
    }
  });
}
