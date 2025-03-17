// /lib/services/jira/fetchTickets.js
import { deleteTokenFromAPI } from 'lib/connectionManager/deleteToken';
import { handleJiraLoginClient } from 'src/app/components/jira/oAuth/handleJiraLoginClient';

export const handleFetchJiraTickets = async (
  accessToken,
  boardId,
  sprintId
) => {
  console.info('handleFetchJiraTickets', { accessToken, boardId, sprintId });

  if (!accessToken) {
    throw new Error('Access token is required.');
  }
  // On passe boardId / sprintId si nécessaire
  const urlParams = new URLSearchParams({ accessToken });
  if (boardId) urlParams.append('boardId', boardId);
  if (sprintId) urlParams.append('sprintId', sprintId);

  const response = await fetch(`/api/jira/tickets?${urlParams.toString()}`);
  const data = await response.json();

  console.info('handleFetchJiraTickets', data);

  if (!response.ok) {
    // Si le token a expiré, on le supprime et on relance la connexion
    console.info('handleFetchJiraTickets => Error => re-login');
    await deleteTokenFromAPI('jira');
    // await handleJiraLoginClient('/jira/tickets');
    throw new Error(
      data.error || 'Erreur inconnue lors de la récupération des tickets JIRA.'
    );
  }

  return data;
};
