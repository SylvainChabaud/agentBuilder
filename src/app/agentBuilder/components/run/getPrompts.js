export const generatePrompt = ({ inputs, outputs }) => {
  console.info('generatePrompt', { inputs, outputs });

  // Vérification et transformation des entrées
  const formattedInputs =
    inputs && Object.keys(inputs).length
      ? Object.entries(inputs)
          .map(
            ([key, value]) =>
              `${key ? key.toLowerCase() : ''}: '${value ? value.toLowerCase() : ''}'`
          )
          .join(', ')
      : '';

  // Vérification et transformation des sorties
  const formattedOutputs = outputs
    ? Object.entries(outputs)
        .map(
          ([key, value]) =>
            `${key ? key.toLowerCase() : ''}: '${value ? value.toLowerCase() : ''}'`
        )
        .join(', ')
    : '';

  // Construire la partie sur les entrées seulement si elles existent
  const inputSection = formattedInputs
    ? `Ta mission est d'analyser les entrées suivantes : { ${formattedInputs} } et de générer une sortie en Français au format JSON! Voici les clés de sortie : { ${formattedOutputs} }`
    : `Ta mission est de générer une sortie en Français au format JSON ! Voici les clés de sortie : { ${formattedOutputs} }
    Exemple de sortie JSON attendue:
    { "key1": "string1", "key2": "string2", "key3": "string3" }`;

  return `### Instructions précises :
  1. Comprends le contexte : analyse soigneusement les entrées.
  2. Applique ton expertise : utilise les meilleures pratiques pour structurer ta réponse.
  3. Respecte le format JSON attendu en sortie.
  4. N'ajoute pas de text autre que le format de sortie souhaité
  
  ${inputSection}

  Génère maintenant ta réponse en respectant ces critères.`.trim();
};
