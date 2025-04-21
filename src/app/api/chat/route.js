import { MODEL_SOURCES } from 'app/constants';
import { fetchOllama } from 'lib/services/ollama/fetchOllama';
import { fetchOpenRouter } from 'lib/services/openRouter/fetchOpenRouter';
import { NextResponse } from 'next/server';
import { openIaWrapper } from './openIaWrapper';

export async function POST(request) {
  try {
    const { userId, messages, model, modelSource } = await request.json();

    if (!messages || !modelSource) {
      return NextResponse.json(
        { error: 'Paramètres manquants' },
        { status: 400 }
      );
    }

    console.info('POST IA', { userId, model, modelSource });

    let result;

    switch (modelSource) {
      case MODEL_SOURCES.OPEN_IA:
        if (!userId) {
          return NextResponse.json(
            { error: 'userId requis pour OPEN_IA' },
            { status: 400 }
          );
        }
        result = await openIaWrapper({ userId, messages });
        break;

      case MODEL_SOURCES.OPEN_ROUTER:
        result = await fetchOpenRouter({ model, messages });
        break;

      case MODEL_SOURCES.OLLAMA:
        result = await fetchOllama({ model, messages });
        break;

      default:
        return NextResponse.json(
          { error: `Source du modèle IA inconnue: ${modelSource}` },
          { status: 400 }
        );
    }

    const { data, tokenUsage, error } = result;

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('❌ Erreur API Chat:', error);
    return NextResponse.json(
      { error: 'Erreur serveur durant la génération' },
      { status: 500 }
    );
  }
}
