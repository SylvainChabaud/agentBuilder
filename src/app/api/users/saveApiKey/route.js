import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const USERS_FILE = path.resolve('data/users.json');
const ENCRYPTION_KEY = process.env.SECRET_ENCRYPTION_KEY?.slice(0, 32); // 32 chars = 256 bits

function encrypt(text) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    Buffer.from(ENCRYPTION_KEY),
    iv
  );
  let encrypted = cipher.update(text, 'utf-8', 'hex');
  encrypted += cipher.final('hex');
  return `${iv.toString('hex')}:${encrypted}`;
}

export async function POST(req) {
  console.info("🔐 [API] Enregistrement d'une clé");

  try {
    const { userId, llmSettings } = await req.json();

    console.info('Payload reçu :', { userId, llmSettings });

    if (
      !userId ||
      !llmSettings?.apiKey ||
      !llmSettings?.baseUrl ||
      !llmSettings?.model
    ) {
      return new Response(JSON.stringify({ error: 'Données incomplètes' }), {
        status: 400,
      });
    }

    const content = await fs.readFile(USERS_FILE, 'utf-8');
    const users = JSON.parse(content);

    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        return {
          ...user,
          llmSettings: {
            apiKey: encrypt(llmSettings.apiKey),
            baseUrl: llmSettings.baseUrl,
            model: llmSettings.model,
          },
        };
      }
      return user;
    });

    await fs.writeFile(USERS_FILE, JSON.stringify(updatedUsers, null, 2));

    console.info('✅ Clé API enregistrée avec succès');
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("❌ Erreur lors de l'enregistrement de la clé :", err);
    return new Response(JSON.stringify({ error: 'Erreur serveur' }), {
      status: 500,
    });
  }
}
