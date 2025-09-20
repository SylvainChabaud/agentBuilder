import { generatePrompt } from '../getPrompts';

export const getIaContext = ({ context, inputs, outputs }) => {
  console.info('getIaContext', { context, inputs, outputs });

  return context
    ? [
        {
          role: 'system',
          content: `${context[0]?.content}
Voici les règles de comportement globales :
1) Réponds avec précision et concision.
2) Sois clair dans ta mise en forme.
3) Ne sors pas de ton rôle d’assistant spécialisé.
4) Tu parles en Français.
5) Tu respectes scrupuleusement le format demandé.
6) Tu ne devines aucune information si elle n’est pas donnée.`,
          timestamp: new Date(),
        },
        // ...context,
        {
          role: 'user',
          content: generatePrompt({ inputs, outputs }),
          timestamp: new Date(),
        },
        {
          role: 'assistant',
          content:
            'Bien sûr ! J’ai bien compris vos instructions et je suis prêt à vous aider.',
          timestamp: new Date(),
        },
      ]
    : [];
};

/**
 * Parse un texte pour en extraire les paires "clé: valeur"
 * - Conserve les accents et apostrophes dans les clés/valeurs
 * - Ignore les caractères de contrôle, mais garde la ponctuation générale
 * - Détecte "clé : valeur" jusqu’à un saut de ligne, une virgule ou la fin du texte
 *
 * @param {string} input - Le texte d'entrée potentiellement bruité
 * @returns {Object} - Un objet contenant les paires clé/valeur
 */
export function advancedTextParser(input) {
  console.info('advancedTextParser', input);
  // 1. Nettoyer uniquement les caractères de contrôle
  //    (ASCII < 32, sauf \n si vous le souhaitez, et quelques autres)
  //    On conserve les lettres accentuées, les chiffres, la ponctuation, etc.
  const sanitized = input.replace(/[\u0000-\u001F\u007F-\u009F]/g, '');

  console.info('sanitized', sanitized);

  const pattern = /([\p{L}\p{M}\p{Nd}\p{Pc}'"\-]+)\s*:\s*([^,\n]+)/giu;

  const result = {};
  let match;

  // 3. Boucle sur tous les couples trouvés
  while ((match = pattern.exec(sanitized)) !== null) {
    const rawKey = match[1].trim();
    const rawValue = match[2].trim();

    // -- Si vous souhaitez tout mettre en minuscules sur la clé :
    //    const key = rawKey.toLowerCase();
    // -- Sinon, vous pouvez garder la casse telle quelle
    const key = rawKey;

    // -- Nettoyer encore la valeur si besoin
    //    (enlever trailing punctuation, etc.)
    const value = rawValue
      .trim()
      // Retirer les backslash devant les guillemets
      .replace(/\\+"/g, '"')
      .replace(/\\+'/g, "'")
      // Ensuite supprimer les guillemets en début/fin (un ou plusieurs)
      .replace(/^["']+/, '')
      .replace(/["']+$/, '')
      // Supprime les espaces en fin de chaîne
      .replace(/\s+$/, '')
      // Supprime tous les doubles astérisques (et éventuels espaces autour)
      .replace(/\*\*/g, '')
      .trim();

    result[key] = value;
  }

  console.info('result', result);

  return result;
}

export const getIaPrompt = ({ data, inputs, hasConvertToString = true }) => {
  console.info('getIaPrompt', { inputs, data });

  let parsedData = {};

  // 🔹 Cas 0 : Si `inputs` est vide, on extrait seulement les clés de `data`: SHEETS !
  if (
    inputs === null ||
    (typeof inputs === 'object' &&
      typeof data === 'object' &&
      Object.entries(inputs).length === 0)
  ) {
    console.log("L'objet inputs est vide."); // PAS DE CONTRAT POUR CETTE EXPERTISE
    parsedData = data;
  } else {
    // 🔹 Cas 1 : Si `data` est un objet, on extrait seulement les clés de `inputs`
    if (typeof data === 'object' && data !== null) {
      parsedData = Object.keys(inputs).reduce((acc, key) => {
        const lowercaseKey = key.toLowerCase();
        // Utiliser la clé en minuscules dans inputs pour vérifier si elle existe dans data
        const matchingKey = Object.keys(data).find(
          (dataKey) => dataKey.toLowerCase() === lowercaseKey
        );

        // Si la clé correspond, on prend la valeur correspondante de data, sinon ''
        acc[lowercaseKey] = matchingKey ? data[matchingKey] : '';
        return acc;
      }, {});
    }

    // 🔹 Cas 2 : Si `data` est une string, on construit un objet avec les clés de `inputs`
    if (typeof data === 'string') {
      // parsedData = data;
      parsedData = advancedTextParser(data);

      // 🔹 Assurer que toutes les clés de `inputs` existent dans `parsedData`
      parsedData = Object.keys(inputs).reduce((acc, key) => {
        const lowercaseKey = key.toLowerCase();
        acc[lowercaseKey] = parsedData[lowercaseKey] || ''; // Ajoute la clé si absente
        return acc;
      }, {});
    }

    console.info('parsedData', parsedData);

    // 🔹 Vérifier si `inputs` est valide
    if (typeof inputs !== 'object' || inputs === null) {
      console.error('getIaPrompt: inputs doit être un objet valide');
      return '';
    }
  }

  // 🔹 Choix du format de sortie
  // const result = hasConvertToString
  //   ? Object.entries(parsedData)
  //       .map(([key, value]) => `${key}: '${value}'`)
  //       .join(', ')
  //   : parsedData;

  const result = Object.entries(parsedData)
    .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
    .join(', ');

  console.info('Formatted Data:', result);
  return result;
};
