import { deleteTokenFromAPI } from 'lib/connectionManager/deleteToken';
import { APPS_LABELS } from 'lib/constants';
// import { handleMsalLogout } from 'lib/msal/handleMsalLogout';

/**
 * Gère la déconnexion utilisateur
 * @returns {Promise<{success: boolean, message: string}>} - Résultat de la déconnexion
 */
export const handleMsalLogout = async () => {
  try {
    // Appelle la méthode de déconnexion MSAL
    await deleteTokenFromAPI(APPS_LABELS.OUTLOOK);
    console.log('Déconnexion réussie.');
    return { success: true, message: 'Vous avez été déconnecté avec succès !' };
  } catch (error) {
    console.error('Erreur lors de la déconnexion :', error);
    return {
      success: false,
      message: 'Une erreur est survenue lors de la déconnexion.',
    };
  }
};
