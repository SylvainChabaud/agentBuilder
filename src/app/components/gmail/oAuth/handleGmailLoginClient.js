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

    // Essayer de lancer l'authentification Gmail
    try {
      await handleGmailAuth(redirect);
      return null;
    } catch (authError) {
      // Gestion spécifique des erreurs d'authentification
      console.error("Erreur d'authentification Gmail :", authError);
      throw new Error("L'authentification Gmail a échoué. Veuillez réessayer.");
    }
  } catch (error) {
    // Gestion générale des erreurs (token, authentification, etc.)
    console.error("Erreur lors de l'authentification Gmail :", error);

    // Supprimer le token s'il y en a un, pour éviter les conflits futurs
    await deleteTokenFromAPI(APPS_LABELS.GMAIL);

    // Relancer une erreur avec un message explicite
    throw new Error(
      `Une erreur s'est produite : ${error.message || 'Erreur inconnue'}`
    );
  }
};
