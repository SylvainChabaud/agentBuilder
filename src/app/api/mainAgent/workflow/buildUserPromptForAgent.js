// lib/prompts/buildUserPromptForAgent.js

/**
 * Génère un prompt 'user' standardisé pour un agent IA exécutant une tâche dans le workflow.
 * Il définit clairement le format attendu des entrées (JSON) et des sorties.
 *
 * @param {string} expertise - Domaine d’expertise de l’agent (ex: "juridique", "analyse de risque")
 * @returns {string} Prompt 'user' à injecter dans l'agent
 */
export function buildUserPromptForAgent(expertise) {
  return `
  Tu es un agent IA expert en ${expertise}, intégré dans un système d’agents collaboratifs.
  
  Tu vas recevoir un objet JSON contenant :
  - task: { name: string, description: string }
  - memory: { byAgent: Object, byTask: Object }
  
  Ta mission :
  1. Lire attentivement la tâche décrite dans "task"
  2. Exploiter les informations disponibles dans "memory" si utile
  3. Réaliser la tâche avec rigueur en t'appuyant sur ton expertise "${expertise}"
  4. Retourner un objet JSON avec la structure suivante :
  {
    "output": "ta réponse complète ici (en français)",
    "reasoning": "ta logique, étapes ou justification",
    "metadata": {
      "agent": "nom de l'agent",
      "confidence": "low" | "medium" | "high"
    }
  }
  
  Réponds uniquement au format JSON. Aucune explication hors JSON n’est attendue.
  `.trim();
}
