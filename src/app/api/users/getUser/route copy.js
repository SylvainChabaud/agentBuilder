import fs from 'fs/promises';
import path from 'path';
import { decrypt } from 'lib/utils/encryption';

const USERS_FILE = path.resolve('data/users.json');

export async function POST(request) {
  try {
    const { userId } = await request.json();

    // 🛑 Validation
    if (!userId) {
      return new Response(
        JSON.stringify({ error: 'ID utilisateur manquant.' }),
        { status: 400 }
      );
    }

    // 📁 Lecture du fichier users.json
    const data = await fs.readFile(USERS_FILE, 'utf8');
    const users = JSON.parse(data);

    // 🔍 Recherche de l'utilisateur
    const user = users.find((u) => u.id === userId);

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Utilisateur introuvable.' }),
        { status: 404 }
      );
    }

    // 🔐 Déchiffrement de la clé API si elle existe dans llmSettings
    let decryptedApiKey = '';
    if (user.llmSettings?.apiKey) {
      try {
        decryptedApiKey = decrypt(user.llmSettings.apiKey);
      } catch (err) {
        console.error('Erreur de déchiffrement de la clé API :', err);
      }
    }

    // 🧠 Renvoyer la configuration LLM déchiffrée
    const llmSettings = {
      apiKey: decryptedApiKey || '',
      baseUrl: user.llmSettings?.baseUrl || '',
      model: user.llmSettings?.model || '',
    };

    // ✅ Réponse utilisateur
    return new Response(
      JSON.stringify({
        id: user.id,
        username: user.username,
        permission: user.permission,
        llmSettings,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Erreur getUserById:', error);
    return new Response(
      JSON.stringify({ error: 'Erreur serveur : ' + error.message }),
      { status: 500 }
    );
  }
}
