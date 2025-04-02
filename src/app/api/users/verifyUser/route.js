import fs from 'fs/promises';
import path from 'path';
import bcrypt from 'bcrypt';

const USERS_FILE = path.resolve('data/users.json');

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return new Response(
        JSON.stringify({ error: 'Nom d’utilisateur et mot de passe requis.' }),
        { status: 400 }
      );
    }

    // Lecture du fichier
    let users = [];
    try {
      const data = await fs.readFile(USERS_FILE, 'utf8');
      users = JSON.parse(data);
    } catch {
      // On ne révèle pas si le fichier est vide/inexistant
      return new Response(
        JSON.stringify({ error: 'Identifiants invalides.' }),
        { status: 401 }
      );
    }

    // Recherche insensible à la casse
    const user = users.find(
      (u) => u.username.toLowerCase() === username.toLowerCase()
    );

    // Vérification mot de passe
    const isValid = user && (await bcrypt.compare(password, user.password));
    if (!isValid) {
      return new Response(
        JSON.stringify({ error: 'Identifiants invalides.' }),
        { status: 401 }
      );
    }

    // ✅ Utilisateur authentifié
    return new Response(
      JSON.stringify({
        id: user.id,
        username: user.username,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Erreur serveur :', error.message);
    return new Response(
      JSON.stringify({ error: 'Erreur serveur : ' + error.message }),
      { status: 500 }
    );
  }
}
