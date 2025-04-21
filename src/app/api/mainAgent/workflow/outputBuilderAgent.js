// lib/ia/generateFinalOutputWithWriter.js
import { DEFAULT_IA_MODEL } from '../constants';
import { callModelAndExtract } from '../lib/callModel';

export async function generateFinalOutputWithWriter({
  userId,
  objective,
  byAgent,
}) {
  const prompt = buildOutputPrompt(objective, byAgent);

  const messages = [
    {
      role: 'system',
      content: `Tu es un agent IA appelé OutputBuilder. Ton rôle est de générer un livrable final **fluide et bien structuré** à partir des résultats produits par d’autres agents IA, afin de répondre à un objectif utilisateur donné.

Tu dois écrire un **texte clair**, divisé en parties si nécessaire, comme un document rédigé pour un humain :
- Utilise des paragraphes, des titres, de la logique, mais **pas de format objet**.
- Résume, regroupe, structure et synthétise ce que les agents ont produit.

🧠 IMPORTANT : la sortie doit être encodée au format JSON **avec une seule clé** "result", dont la valeur est **un texte libre** (un document final lisible).

Exemple attendu :
{
  "result": "Voici le livrable structuré en paragraphes, avec titres et explications. Il s’agit d’un texte clair, sans balises ni objets JSON internes."
}

Aucune autre sortie. Strictement ce JSON.
Tu réponds uniquement en français.`,
    },
    {
      role: 'user',
      content: prompt,
    },
  ];

  const iaRequest = {
    userId,
    messages,
    ...DEFAULT_IA_MODEL,
  };

  const { result, tokenUsage } = await callModelAndExtract(iaRequest);
  return { finalOutput: result, tokenUsage };
}

function buildOutputPrompt(objective, byAgent) {
  return `
Objectif utilisateur :
"""${objective}"""

Résultats par agents IA :
${Object.entries(byAgent)
  .map(([agentId, entries]) => {
    const formatted = entries
      .map((entry, i) => {
        const { task, output } = entry;
        const res = output?.result || {};
        return `
🧩 Tâche #${i + 1} – ${task.name}
Résumé : ${res.summary || '—'}
Recommandations : ${
          Array.isArray(res.recommendations)
            ? res.recommendations
                .map(
                  (r) => `- ${typeof r === 'string' ? r : JSON.stringify(r)}`
                )
                .join('\n')
            : '—'
        }
Justification : ${res.justification || '—'}
`;
      })
      .join('\n');
    return `\n===== Résultats de ${agentId} =====\n${formatted}`;
  })
  .join('\n')}

Ta mission :
- Génère un livrable final clair, fluide et structuré à partir de ces résultats.
- Structure ta réponse avec des titres et sous-titres si nécessaire.
- Reformule utilement les points clés sans redondance.
`.trim();
}
