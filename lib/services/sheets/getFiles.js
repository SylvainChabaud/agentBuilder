import { deleteTokenFromAPI } from '../../../lib/connectionManager/deleteToken';
import { handleGmailLoginClient } from '../../../src/app/components/gmail/oAuth/handleGmailLoginClient';

export const handleFetchSheets = async (accessToken) => {
  console.info('handleFetchSheets', accessToken);

  if (!accessToken) {
    throw new Error('Access token is required.');
  }

  const response = await fetch(
    `/api/gmail/sheets/getFiles?accessToken=${accessToken}`
  );
  const data = await response.json();

  if (!response.ok) {
    console.info('handleFetchSheets 1');
    await deleteTokenFromAPI('gmail');
    console.info('handleFetchSheets 1');
    await handleGmailLoginClient('/sheets');
    throw new Error(
      data.error || 'Erreur inconnue lors de la récupération des emails.'
    );
  }

  return data;
};
