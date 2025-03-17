'use client';

import { checkTokenInAPI } from 'lib/connectionManager/checkToken';
import { deleteTokenFromAPI } from 'lib/connectionManager/deleteToken';
import { APPS_LABELS } from 'lib/constants';
import { handleGmailAuth } from 'lib/services/gmail/auth';

/**
 * Gère le flux OAuth2 pour Gmail côté client avec stockage sécurisé
 */
export const handleGmailLoginClient = async (redirect) => {
  console.info('handleGmailLoginClient 1 ', { redirect });

  try {
    // 1. Vérifier l'existence d'un token valide
    const existingToken = await checkTokenInAPI(APPS_LABELS.GMAIL);
    if (existingToken) {
      console.log('Token Gmail existant réutilisé');
      return existingToken;
    }

    console.info('handleGmailLoginClient', { redirect });

    handleGmailAuth(redirect);
    return null;
  } catch (error) {
    console.error("Erreur lors de l'authentification Gmail :", error);
    await deleteTokenFromAPI(APPS_LABELS.GMAIL);
    throw error;
  }
};
