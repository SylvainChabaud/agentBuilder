import fs from 'fs/promises';
import path from 'path';
import bcrypt from 'bcrypt';

const filePath = path.resolve('data/users.json');

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    console.log('🔍 username :', username);
    console.log('🔍 password :', password);

    if (!username || !password) {
      return new Response(
        JSON.stringify({ error: 'Username and password required' }),
        { status: 400 }
      );
    }

    let users = [];
    try {
      const data = await fs.readFile(filePath, 'utf8');
      users = JSON.parse(data);
    } catch (err) {
      return new Response(JSON.stringify({ error: 'No users found' }), {
        status: 404,
      });
    }

    const user = users.find((u) => u.username === username);
    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
      });
    }

    console.log('🔍 user :', user);
    const isValid = await bcrypt.compare(password, user.password);

    console.log('🔍 isValid :', isValid);
    if (!isValid) {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
        status: 401,
      });
    }

    return new Response(JSON.stringify({ message: 'User verified' }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
