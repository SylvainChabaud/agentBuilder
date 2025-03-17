import { handleMsalLogin } from 'lib/msal/handleMsalLogin';

/**
 * Envoie un email via Outlook
 * @param {Object} emailData - Contenu de l'email
 * @param {string} emailData.to - Destinataire de l'email
 * @param {string} emailData.subject - Sujet de l'email
 * @param {string} emailData.content - Contenu de l'email
 * @returns {Promise<{success: boolean, message: string}>} - Statut de l'envoi
 */
export const sendOutlookEmail = async ({ to, subject, content }) => {
  try {
    // Récupérer le token d'accès pour Outlook
    const accessToken = await handleMsalLogin();

    if (!accessToken) {
      throw new Error("Jeton d'accès non trouvé. Connectez-vous d'abord.");
    }

    // Effectuer la requête pour envoyer l'email
    const response = await fetch('/api/azure/sendEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ to, subject, content }),
    });

    if (response.ok) {
      return { success: true, message: 'Email envoyé avec succès !' };
    } else {
      const error = await response.json();
      return { success: false, message: `Erreur : ${error.error}` };
    }
  } catch (error) {
    console.error('Erreur dans sendOutlookEmail :', error);
    return { success: false, message: "Erreur lors de l'envoi de l'email." };
  }
};
