import fs from 'fs';
import path from 'path';

const filePath = path.resolve('data/workflows.json');

export async function GET() {
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: 'Erreur lors de la récupération des workflows',
      }),
      { status: 500 }
    );
  }
}
