import { deleteTokenFromAPI } from 'lib/connectionManager/deleteToken';
import { handleGmailLoginClient } from 'src/app/components/gmail/oAuth/handleGmailLoginClient';

export const handleFetchSheetContent = async ({
  accessToken,
  selectedSheetId,
  selectedSheetName,
}) => {
  console.info('handleFetchSheetContent', {
    accessToken,
    selectedSheetId,
    selectedSheetName,
  });

  if (!accessToken || !selectedSheetId || !selectedSheetName) {
    throw new Error(
      'Access token, selectedSheetId and selectedSheetName are required.'
    );
  }

  const response = await fetch(
    `/api/gmail/sheets/getFileContent?accessToken=${accessToken}&sheetId=${selectedSheetId}&sheetName=${selectedSheetName}`
  );
  const data = await response.json();

  if (!response.ok) {
    console.info('handleFetchSheetContent 1');
    await deleteTokenFromAPI('gmail');
    console.info('handleFetchSheetContent 1');
    await handleGmailLoginClient('/sheets');
    throw new Error(
      data.error || 'Erreur inconnue lors de la récupération des emails.'
    );
  }

  return data;
};
