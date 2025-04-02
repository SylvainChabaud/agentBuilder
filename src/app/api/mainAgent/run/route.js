// src/app/api/mainAgent/run/route.js (MOCK complet pour front avec délai simulé)
import { NextResponse } from 'next/server';
import crypto from 'crypto';

export const config = {
  api: {
    bodyParser: false,
  },
};

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const getMock = (workflowId) => ({
  workflowId,
  status: 'ready',
  logs: [
    { type: 'info', message: '🎯 Objectif reçu et enregistré' },
    { type: 'info', message: '📎 Contexte reçu (fichiers simulés)' },
    { type: 'info', message: '🧠 Étapes préparées, prêt à lancer l’analyse' },
  ],
  memory: {
    version: 1,
    summary: 'Mémoire initialisée (simulation)',
  },
  output: '🚀 Ceci est un livrable simulé généré par le moteur IA.',
  validation: {
    success: false,
    feedback: '🧪 Étape de validation encore à effectuer.',
  },
});

export async function POST(req) {
  // Simule un traitement léger côté back avec UUID
  const workflowId = crypto.randomUUID();

  // Simule une attente pour faire apparaître le loader côté front
  await delay(2000); // 2 secondes

  return NextResponse.json(getMock(workflowId));
}
