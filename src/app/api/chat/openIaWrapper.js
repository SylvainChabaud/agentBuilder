import { fetchOpenIa } from './fetchOpenIa';
import { getLlmSettingsByUserId } from './getLlmSettingsByUserId';

export const openIaWrapper = async ({ userId, messages }) => {
  console.info('🧠 openIaWrapper', { userId, messages });

  const config = await getLlmSettingsByUserId(userId);

  if (!config) {
    throw new Error(
      'Impossible de récupérer les paramètres IA pour cet utilisateur.'
    );
  }

  const result = await fetchOpenIa({ userId, messages, config });

  return result;
};
