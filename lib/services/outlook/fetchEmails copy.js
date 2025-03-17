import { handleMsalLogin } from 'lib/msal/handleMsalLogin';

/**
 * Récupère une liste d'emails
 * @returns {Promise<{emails: Array, error: string|null}>} - Liste des emails et une erreur éventuelle
 */
export const fetchOutlookEmails = async () => {
  try {
    // Obtenir le token d'accès
    const accessToken = await handleMsalLogin();
    if (!accessToken) {
      throw new Error("Jeton d'accès non trouvé. Connectez-vous d'abord.");
    }

    // Appeler l'API pour récupérer les emails
    const response = await fetch('/api/azure/emails', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des emails.');
    }

    const emails = await response.json();
    return { emails, error: null };
  } catch (error) {
    console.error('Erreur dans fetchEmails :', error);
    return { emails: [], error: error.message };
  }
};
