export const MAIN_AGENT_MOCK = {
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
};
