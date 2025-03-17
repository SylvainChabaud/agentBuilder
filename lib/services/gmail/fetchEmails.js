import { deleteTokenFromAPI } from 'lib/connectionManager/deleteToken';
import { handleGmailLoginClient } from 'src/app/components/gmail/oAuth/handleGmailLoginClient';

export const handleFetchEmails = async (accessToken) => {
  console.info('handleFetchEmails', accessToken);

  if (!accessToken) {
    throw new Error('Access token is required.');
  }

  const response = await fetch(`/api/gmail/emails?accessToken=${accessToken}`);
  const data = await response.json();

  if (!response.ok) {
    console.info('handleFetchEmails 1');
    await deleteTokenFromAPI('gmail');
    console.info('handleFetchEmails 1');
    await handleGmailLoginClient('/agentBuilder');
    throw new Error(
      data.error || 'Erreur inconnue lors de la récupération des emails.'
    );
  }

  return data;
};
