import { fetchOllama } from 'lib/services/ollama/fetchOllama';
import { fetchOpenRouter } from 'lib/services/openRouter/fetchOpenRouter';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { messages, model, isOpenRouter } = await request.json();

    console.info('POST', { messages, model, isOpenRouter });

    if (!messages || !model) {
      return NextResponse.json(
        { error: 'Paramètres manquants' },
        { status: 400 }
      );
    }

    const fetchFunc = isOpenRouter ? fetchOpenRouter : fetchOllama;
    const { data } = await fetchFunc({ model, messages });

    console.info('data', data);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Erreur API Chat:', error);
    return NextResponse.json(
      { error: 'Échec de la génération de la réponse' },
      { status: 500 }
    );
  }
}
