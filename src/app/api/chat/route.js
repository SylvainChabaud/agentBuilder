import { MODEL_SOURCES } from 'app/constants';
import { fetchOllama } from 'lib/services/ollama/fetchOllama';
import { fetchOpenIa } from 'lib/services/openIa/fetchOpenIa';
import { fetchOpenRouter } from 'lib/services/openRouter/fetchOpenRouter';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { messages, model, modelSource } = await request.json();

    console.info('POST', { messages, model, modelSource });

    if (!messages || !model) {
      return NextResponse.json(
        { error: 'Paramètres manquants' },
        { status: 400 }
      );
    }

    let fetchFunc;
    switch (modelSource) {
      case MODEL_SOURCES.OPEN_ROUTER:
        fetchFunc = fetchOpenRouter;
        break;
      case MODEL_SOURCES.OLLAMA:
        fetchFunc = fetchOllama;
        break;
      case MODEL_SOURCES.OPEN_IA:
        fetchFunc = fetchOpenIa;
        break;
      default:
        throw new Error(`Source du modèle IA inconnue: ${modelSource}`);
    }
    const { data, tokenUsage } = await fetchFunc({ model, messages });

    console.info('data', { data, tokenUsage });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Erreur API Chat:', error);
    return NextResponse.json(
      { error: 'Échec de la génération de la réponse' },
      { status: 500 }
    );
  }
}
