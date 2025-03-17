'use client';

import { initializeMsal } from 'src/app/components/outlook/msal/aadProvider';
import { checkTokenInAPI } from 'lib/connectionManager/checkToken';
import { saveTokenToAPI } from 'lib/connectionManager/saveToken';
import { APPS_LABELS } from 'lib/constants';
import { loginRequest } from './msalConfigClient';

// Variable pour éviter les interactions multiples
let interactionInProgress = false;

/**
 * Rafraîchit ou obtient un token d'accès via MSAL côté client.
 * Utilise d'abord le cache (via checkTokenInAPI) puis tente d'obtenir
 * le token silencieusement. Si aucun compte n'est trouvé ou si une interaction
 * est requise, lance loginPopup pour authentifier l'utilisateur.
 *
 * @returns {Promise<string>} Le token d'accès valide.
 */
export const handleMsalLoginClient = async () => {
  // Obtenir l'instance MSAL (supposée être synchronisée)
  const msalInstance = await initializeMsal();

  try {
    // Vérifier si un token existe déjà dans votre système de cache
    const existingToken = await checkTokenInAPI(APPS_LABELS.OUTLOOK);
    if (existingToken) {
      console.log('Token existant trouvé, aucune action nécessaire.');
      return existingToken;
    }

    // Récupérer les comptes (utilisateurs) disponibles dans MSAL
    let accounts = msalInstance.getAllAccounts();
    if (!accounts || accounts.length === 0) {
      // Aucun compte trouvé : déclencher une connexion interactive
      if (!interactionInProgress) {
        interactionInProgress = true;
        try {
          console.warn('Aucun compte trouvé, lancement de loginPopup...');
          const loginResponse = await msalInstance.loginPopup(loginRequest);
          const accessToken = loginResponse.accessToken;
          console.log('Token obtenu après loginPopup :', accessToken);
          await saveTokenToAPI(APPS_LABELS.OUTLOOK, accessToken);
          return accessToken;
        } finally {
          interactionInProgress = false;
        }
      } else {
        throw new Error(
          'Une interaction est déjà en cours. Veuillez patienter.'
        );
      }
    }

    // Si un compte existe, tenter d'obtenir le token en mode silencieux
    try {
      const account = accounts[0];
      const tokenResponse = await msalInstance.acquireTokenSilent({
        account,
        ...loginRequest,
      });
      const accessToken = tokenResponse.accessToken;
      console.log('Token silencieux obtenu :', accessToken);
      await saveTokenToAPI(APPS_LABELS.OUTLOOK, accessToken);
      return accessToken;
    } catch (silentError) {
      // Si l'obtention silencieuse échoue à cause d'une interaction requise
      if (silentError.name === 'InteractionRequiredAuthError') {
        if (!interactionInProgress) {
          interactionInProgress = true;
          try {
            console.warn('Interaction requise, lancement de loginPopup...');
            const loginResponse = await msalInstance.loginPopup(loginRequest);
            const accessToken = loginResponse.accessToken;
            console.log('Token obtenu après loginPopup :', accessToken);
            await saveTokenToAPI(APPS_LABELS.OUTLOOK, accessToken);
            return accessToken;
          } finally {
            interactionInProgress = false;
          }
        } else {
          throw new Error(
            'Une interaction est déjà en cours. Veuillez patienter.'
          );
        }
      } else {
        console.error(
          'Erreur lors de l’acquisition silencieuse du token :',
          silentError
        );
        throw silentError;
      }
    }
  } catch (error) {
    console.error('Erreur inconnue lors du rafraîchissement du token :', error);
    throw error;
  }
};
