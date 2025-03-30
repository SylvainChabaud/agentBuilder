import fs from 'fs/promises';
import path from 'path';
import bcrypt from 'bcrypt';

const filePath = path.resolve('data/users.json');

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return new Response(
        JSON.stringify({ error: 'Username and password are required.' }),
        { status: 400 }
      );
    }

    console.log('🔍 username :', username);
    console.log('🔍 password :', password);

    let users = [];
    try {
      const data = await fs.readFile(filePath, 'utf8');
      users = JSON.parse(data);
    } catch (err) {
      // Si le fichier n'existe pas, on part d'un tableau vide
      users = [];
    }

    console.log('🔍 users :', users);

    // Vérifie si un utilisateur existe déjà (insensible à la casse)
    const existingUser = users.find(
      (u) => u.username.toLowerCase() === username.toLowerCase()
    );

    if (existingUser) {
      return new Response(
        JSON.stringify({ error: 'Cet utilisateur existe déjà.' }),
        { status: 409 } // 409 Conflict
      );
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { username, password: hashedPassword };

    users.push(newUser);
    await fs.writeFile(filePath, JSON.stringify(users, null, 2));

    return new Response(
      JSON.stringify({ message: 'Utilisateur créé avec succès.' }),
      {
        status: 201,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Erreur serveur : ' + error.message }),
      {
        status: 500,
      }
    );
  }
}
