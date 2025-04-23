import { deleteTokenFromAPI } from 'lib/connectionManager/deleteToken';
import { handleGmailLoginClient } from 'src/app/components/gmail/oAuth/handleGmailLoginClient';

export const handleFetchEmails = async (accessToken) => {
  console.info('handleFetchEmails', accessToken);

  // Vérification de la présence du token d'accès
  if (!accessToken) {
    throw new Error("Le token d'accès est requis pour récupérer les emails.");
  }

  try {
    // Appel à l'API pour récupérer les emails
    const response = await fetch(
      `/api/gmail/emails?accessToken=${accessToken}`
    );
    const data = await response.json();

    if (!response.ok) {
      // Si la réponse de l'API est incorrecte, supprimer le token et redemander la connexion
      console.info(
        'handleFetchEmails - Erreur lors de la récupération des emails'
      );
      await deleteTokenFromAPI('gmail');
      await handleGmailLoginClient('/agentBuilder');

      // Relancer l'erreur avec un message explicite
      throw new Error(
        data.error || 'Erreur inconnue lors de la récupération des emails.'
      );
    }

    // Retourner les données si tout est ok
    return data;
  } catch (err) {
    // Gestion des erreurs génériques (ex. problème réseau, API non accessible)
    console.error('handleFetchEmails - Une erreur est survenue:', err.message);
    throw new Error(`Erreur dans handleFetchEmails: ${err.message}`);
  }
};
