import { initializeMsal } from 'src/app/components/outlook/msal/aadProvider';
import { checkTokenInAPI } from 'lib/connectionManager/checkToken';
import { saveTokenToAPI } from 'lib/connectionManager/saveToken';
import { APPS_LABELS } from 'lib/constants';
import { loginRequest } from 'src/app/components/outlook/msal/msalConfigClient';

/**
 * Rafraîchit ou obtient un token d'accès via MSAL
 * @returns {Promise<string>} - Retourne un token d'accès valide
 */
export const handleMsalLogin = async () => {
  const msalInstance = await initializeMsal();

  try {
    // Vérifie si le token existe déjà
    const existingToken = await checkTokenInAPI(APPS_LABELS.OUTLOOK);
    if (existingToken) {
      console.log('Token existant trouvé, aucune action nécessaire.');
      return existingToken;
    }

    // Vérifie les comptes dans MSAL
    const accounts = msalInstance.getAllAccounts();
    if (accounts.length === 0) {
      throw Object.assign(
        new Error("Aucun compte trouvé. L'utilisateur doit se reconnecter."),
        { name: 'InteractionRequiredAuthError' }
      );
    }

    // Obtenir un token en mode silencieux
    const account = accounts[0];
    const { accessToken } = await msalInstance.acquireTokenSilent({
      account,
      ...loginRequest,
    });

    console.log('Token silencieux obtenu :', accessToken);

    // Sauvegarde le nouveau token
    await saveTokenToAPI(APPS_LABELS.OUTLOOK, accessToken);

    return accessToken;
  } catch (error) {
    console.error('Erreur capturée :', error);

    if (error.name === 'InteractionRequiredAuthError') {
      console.warn('Interaction requise pour obtenir un nouveau token.');
      const { accessToken } = await msalInstance.loginPopup(loginRequest);

      console.log('Token obtenu après interaction :', accessToken);

      // Sauvegarde le token après authentification
      await saveTokenToAPI(APPS_LABELS.OUTLOOK, accessToken);

      return accessToken;
    } else {
      console.error(
        'Erreur inconnue lors du rafraîchissement du token :',
        error
      );
      throw error;
    }
  }
};
