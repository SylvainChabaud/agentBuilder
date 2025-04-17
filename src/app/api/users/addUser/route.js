import fs from 'fs/promises';
import path from 'path';
import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';

const USERS_FILE = path.resolve('data/users.json');
const USERS_DIR = path.resolve('data/users');

// Validation simple des entrées
function isValidUsername(username) {
  return typeof username === 'string' && username.length >= 3;
}

function isValidPassword(password) {
  return typeof password === 'string' && password.length >= 6;
}

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    if (!isValidUsername(username) || !isValidPassword(password)) {
      return new Response(
        JSON.stringify({ error: 'Nom utilisateur ou mot de passe invalide.' }),
        { status: 400 }
      );
    }

    let users = [];
    try {
      const data = await fs.readFile(USERS_FILE, 'utf8');
      users = JSON.parse(data);
    } catch (err) {
      users = [];
    }

    const existingUser = users.find(
      (u) => u.username.toLowerCase() === username.toLowerCase()
    );

    if (existingUser) {
      return new Response(
        JSON.stringify({ error: 'Cet utilisateur existe déjà.' }),
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = randomUUID();
    const newUser = {
      id: userId,
      username,
      password: hashedPassword,
      permission: '',
    };

    users.push(newUser);
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));

    const userDir = path.join(USERS_DIR, userId);
    await fs.mkdir(userDir, { recursive: true });
    await fs.writeFile(path.join(userDir, 'expertises.json'), '[]');
    await fs.writeFile(path.join(userDir, 'connections.json'), '[]');
    await fs.writeFile(path.join(userDir, 'workflows.json'), '[]');

    return new Response(
      JSON.stringify({
        message: 'Utilisateur créé avec succès.',
        user: { id: newUser.id, username: newUser.username },
      }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Erreur serveur : ' + error.message }),
      { status: 500 }
    );
  }
}
