import fs from 'fs/promises';
import path from 'path';
import bcrypt from 'bcrypt';

const filePath = path.resolve('data/users.json');

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    if (!username || !password) {
      return new Response(
        JSON.stringify({ error: 'Username and password required' }),
        { status: 400 }
      );
    }

    // Lire les utilisateurs existants depuis le fichier
    let users = [];
    try {
      const data = await fs.readFile(filePath, 'utf8');
      users = JSON.parse(data);
    } catch (err) {
      // Si le fichier n'existe pas, on part d'un tableau vide
      users = [];
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { username, password: hashedPassword };

    users.push(newUser);
    await fs.writeFile(filePath, JSON.stringify(users, null, 2));

    return new Response(JSON.stringify(newUser), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
