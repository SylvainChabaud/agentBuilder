export const convertRowsToObjects = (rows) => {
  if (!Array.isArray(rows) || rows.length === 0) {
    return [];
  }

  // On sépare la première ligne (en-têtes) du reste des lignes (données)
  const [headers, ...dataRows] = rows;

  // Pour chaque ligne, on crée un objet { en-tête: valeur, ... }
  return dataRows.map((row) => {
    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = row[index];
    });
    return obj;
  });
};

/**
 * Extrait des paires "clé: valeur" ou "clé = valeur" depuis une chaîne,
 * en conservant l'intégralité du texte (accents, ponctuation...),
 * et en s'arrêtant juste avant la prochaine clé.
 *
 * @param {string} str - La chaîne d'entrée (par ex. "key2: 'eoeo', key1: 0, key3: 'Le profil...'")
 * @param {object} keys - Un objet { nomDeCle: "string"/"number"/... }
 * @returns {object} Un objet { cle1: valeur1, cle2: valeur2, ... }
 */
export const parseStringToObject = (str, keys) => {
  // 1) Unifier ou supprimer les retours à la ligne, puis unifier les espaces multiples
  let cleanedStr = str;

  // Méthode A : transformer tous les sauts de ligne en espaces :
  cleanedStr = cleanedStr.replace(/\r?\n/g, ' ');

  // Ensuite, on transforme toute suite de "whitespace" (espaces, tab, etc.)
  // en un seul espace
  cleanedStr = cleanedStr.replace(/\s+/g, ' ').trim();

  const result = {};

  // Liste de toutes les clés
  const keyNames = Object.keys(keys);
  if (keyNames.length === 0) return result;

  // 2) Construire la RegExp insensible à la casse pour repérer chaque clé
  //    ex: /\b(key1|key2|key3)\b\s*[:=]\s*/gi
  const keysPattern = keyNames.map((k) => escapeRegExp(k)).join('|');
  const regex = new RegExp(`\\b(${keysPattern})\\b\\s*[:=]\\s*`, 'gi');

  // 3) Trouver toutes les occurrences
  const matches = [];
  let match;
  while ((match = regex.exec(cleanedStr)) !== null) {
    matches.push({
      keyFound: match[1], // par ex. "key2"
      matchIndex: match.index,
      matchLength: match[0].length,
    });
  }
  if (matches.length === 0) return result;

  // 4) Extraire la valeur pour chaque clé
  for (let i = 0; i < matches.length; i++) {
    const { keyFound, matchIndex, matchLength } = matches[i];

    // Retrouver la clé dans l'objet keys (insensible à la casse)
    const actualKey = keyNames.find(
      (k) => k.toLowerCase() === keyFound.toLowerCase()
    );
    if (!actualKey) continue;

    // Début de la valeur juste après "clé + :/="
    const valueStart = matchIndex + matchLength;

    // Fin de la valeur = début de la prochaine clé ou fin de chaîne
    const valueEnd =
      i < matches.length - 1 ? matches[i + 1].matchIndex : cleanedStr.length;

    // Récupérer la sous-chaîne
    let value = cleanedStr.substring(valueStart, valueEnd).trim();

    // Optionnel : retirer une virgule en fin de valeur si c'est un simple séparateur
    value = value.replace(/,\s*$/, '');

    // 5) Conversion en fonction du type
    switch (keys[actualKey]) {
      case 'number': {
        const num = parseFloat(value);
        value = isNaN(num) ? null : num;
        break;
      }
      case 'string':
      default:
        // Laisser la valeur telle quelle, ou la manipuler (ex: value.toLowerCase())
        break;
    }

    // 6) Ajouter au résultat
    result[actualKey] = value;
  }

  return result;
};

export function extractObject(inputText, inputObject) {
  console.info('extractObject', { inputText, inputObject });

  // 1. Nettoyage du texte (supprime guillemets autour des clés)
  const cleanedText = cleanInputText(inputText);
  console.info('extractObject 1', cleanedText);

  // 2. Recherche des positions des clés ET des ':' associés
  const keys = Object.keys(inputObject);
  const keysPosition = [];

  for (const key of keys) {
    const regex = new RegExp('\\b' + escapeRegExp(key) + '\\b', 'gi'); // Match exact insensible à la casse
    let match;

    while ((match = regex.exec(cleanedText)) !== null) {
      const keyStart = match.index;
      const keyEnd = keyStart + match[0].length;
      const nextChars = cleanedText.slice(keyEnd, keyEnd + 5); // 5 caractères après la clé

      const colonIndex = nextChars.indexOf(':'); // Cherche ':' dans les 5 caractères
      if (colonIndex !== -1) {
        const colonPosition = keyEnd + colonIndex;
        keysPosition.push({ key, keyStart, colonPosition });
      }
    }
  }

  // 3. Tri par ordre d'apparition
  keysPosition.sort((a, b) => a.keyStart - b.keyStart);
  console.info('extractObject 3', keysPosition);

  // 4. Extraction des valeurs (précision avec colonPosition)
  const result = {};
  for (let i = 0; i < keysPosition.length; i++) {
    const currentKey = keysPosition[i];
    const nextKey = keysPosition[i + 1];

    const valueStart = currentKey.colonPosition + 1; // Après le ':'
    const valueEnd = nextKey ? nextKey.keyStart : cleanedText.length;

    const rawValue = cleanedText.slice(valueStart, valueEnd);
    const cleanValue = rawValue.trim().replace(/,\s*$/, '').trim();

    result[currentKey.key] = cleanValue;
  }

  console.info('extractObject 5', result);
  return result;
}

// Fonction cleanInputText modifiée pour normaliser les clés
function cleanInputText(text) {
  return text
    .replace(/"(\w+)"\s*:/g, '$1:') // Enlève les " autour des clés
    .replace(/\s+/g, ' ')
    .replace(/\s*:\s*/g, ': ')
    .trim();
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
