import fs from 'fs/promises';
import path from 'path';
import { decrypt } from '/lib/utils/encryption';

const USERS_FILE = path.resolve('data/users.json');

/**
 * Récupère les paramètres IA d’un utilisateur, en déchiffrant la clé API.
 * @param {string} userId
 * @returns {Object|null} { apiKey, baseUrl, model } ou null
 */
export async function getLlmSettingsByUserId(userId) {
  if (!userId) throw new Error('userId manquant');

  const content = await fs.readFile(USERS_FILE, 'utf-8');
  const users = JSON.parse(content);
  const user = users.find((u) => u.id === userId);

  if (
    !user?.llmSettings?.apiKey ||
    !user.llmSettings.baseUrl ||
    !user.llmSettings.model
  ) {
    throw new Error('Configuration IA incomplète');
  }

  const decryptedApiKey = decrypt(user.llmSettings.apiKey);

  return {
    apiKey: decryptedApiKey,
    baseUrl: user.llmSettings.baseUrl,
    model: user.llmSettings.model,
  };
}
