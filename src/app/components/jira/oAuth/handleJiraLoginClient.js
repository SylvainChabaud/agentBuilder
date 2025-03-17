// /src/app/components/jira/oAuth/handleJiraLoginClient.js

'use client';

import { checkTokenInAPI } from 'lib/connectionManager/checkToken';
import { deleteTokenFromAPI } from 'lib/connectionManager/deleteToken';
import { APPS_LABELS } from 'lib/constants';

export const handleJiraLoginClient = async (redirect) => {
  console.info('handleJiraLoginClient', { redirect });

  try {
    // 1. Vérifier l'existence d'un token valide en base
    const existingToken = await checkTokenInAPI(APPS_LABELS.JIRA);
    if (existingToken) {
      console.log('Token JIRA existant réutilisé');
      return existingToken;
    }

    // 2. Pas de token => on redirige vers /api/jira/auth pour déclencher la connexion
    const loginUrl = `/api/jira/auth?redirect=${encodeURIComponent(redirect)}`;
    window.location.href = loginUrl;
  } catch (error) {
    console.error("Erreur lors de l'authentification JIRA :", error);
    await deleteTokenFromAPI(APPS_LABELS.JIRA);
    throw error;
  }
};
