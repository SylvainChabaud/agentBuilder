import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const USERS_FILE = path.resolve('data/users.json');
const ENCRYPTION_KEY = process.env.SECRET_ENCRYPTION_KEY?.slice(0, 32); // 32 chars = 256 bits
const IV = crypto.randomBytes(16); // Initialisation aléatoire

function encrypt(text) {
  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    Buffer.from(ENCRYPTION_KEY),
    IV
  );
  let encrypted = cipher.update(text, 'utf-8', 'hex');
  encrypted += cipher.final('hex');
  return `${IV.toString('hex')}:${encrypted}`;
}

export async function POST(req) {
  console.info('POST API KEY');
  try {
    const { userId, apiKey } = await req.json();

    console.info('POST saveApiKey', { userId, apiKey });

    if (!userId || !apiKey) {
      return new Response(JSON.stringify({ error: 'Données manquantes' }), {
        status: 400,
      });
    }

    const content = await fs.readFile(USERS_FILE, 'utf-8');
    const users = JSON.parse(content);

    const updatedUsers = users.map((u) =>
      u.id === userId ? { ...u, apiKey: encrypt(apiKey) } : u
    );

    await fs.writeFile(USERS_FILE, JSON.stringify(updatedUsers, null, 2));

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error('❌ API Key Save Error:', err);
    return new Response(JSON.stringify({ error: 'Erreur serveur' }), {
      status: 500,
    });
  }
}
