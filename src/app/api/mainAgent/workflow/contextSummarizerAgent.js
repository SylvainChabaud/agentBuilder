// lib/ia/agents/contextSummarizerAgent.js
import { DEFAULT_IA_MODEL } from '../constants';
import { callModelAndExtract } from '../lib/callModel';

const SYSTEM_MESSAGE = `Tu es un agent IA spécialisé dans l'analyse et la synthèse de documents en français.
Tu dois toujours répondre en respectant strictement le format JSON spécifié.`;

/**
 * Résume un fichier isolé avec sortie JSON propre
 * @param {Object} file - { name, content }
 * @returns {Promise<string>} résumé texte
 */
export async function summarizeOne(file) {
  const prompt = `Voici un document nommé "${file.name}".
  
  Ta mission est de résumer ce document de façon structurée et exploitable pour la suite d'un projet.
  
  Tu dois :
  - Extraire les informations essentielles et les organiser clairement.
  - Conserver les éléments utiles pour une future analyse, même s'ils ne semblent pas immédiatement critiques.
  - Ne jamais supprimer un point potentiellement utile à une réflexion stratégique ou à une prise de décision.
  
  Format de réponse attendu (JSON uniquement) : { "summary": "string", "keyElements": ["string"] }
  
  Document :\n\n${file.content}`;

  const messages = [
    { role: 'system', content: SYSTEM_MESSAGE },
    { role: 'user', content: prompt },
  ];

  const iaRequest = {
    messages,
    ...DEFAULT_IA_MODEL,
  };

  const { result } = await callModelAndExtract(iaRequest);

  return {
    summary: result.summary,
    keyElements: result.keyElements || [],
  };
}

/**
 * Regroupe les résumés de chaque document en une synthèse globale avec sortie JSON propre
 * @param {Array<{ name: string, summary: string }>} fileSummaries
 * @returns {Promise<string>} résumé global consolidé
 */
export async function consolidateSummaries(fileSummaries) {
  const intro = `Tu es un agent IA qui doit fusionner plusieurs résumés de documents pour créer une synthèse globale utile à la suite d’un projet.
  
  Voici les résumés individuels :\n\n`;

  const content = fileSummaries
    .map(
      (f, i) =>
        `Résumé ${i + 1} – ${f.name} :\nRésumé : ${f.summary}\nÉléments clés :\n${JSON.stringify(f.keyElements, null, 2)}`
    )
    .join('\n\n');

  const prompt = `${intro}${content}
  
  Fais une synthèse finale claire en français, et fournis également les éléments clés à retenir pour la suite du projet.
  
  Format de réponse attendu (JSON uniquement) : { "summary": "string", "keyElements": ["string"] }`;

  const messages = [
    { role: 'system', content: SYSTEM_MESSAGE },
    { role: 'user', content: prompt },
  ];

  const iaRequest = {
    messages,
    ...DEFAULT_IA_MODEL,
  };

  const { result, tokenUsage } = await callModelAndExtract(iaRequest);

  return {
    summary: result.summary,
    keyElements: result.keyElements || [],
    tokenUsage,
  };
}
