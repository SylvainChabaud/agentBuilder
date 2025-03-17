// lib/services/jira/fetchBoards.js

/**
 * Récupère la liste des boards Jira accessibles pour l'utilisateur authentifié.
 * @param {string} accessToken - Le token d'accès OAuth.
 * @returns {Promise<object>} La réponse JSON contenant la liste des boards.
 */
export async function getJiraBoards(accessToken) {
  // 1. Récupérer le cloudId via l'endpoint accessible-resources
  const accessibleResourcesRes = await fetch(
    'https://api.atlassian.com/oauth/token/accessible-resources',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      },
    }
  );

  console.info('getJiraBoards 1', accessibleResourcesRes);

  if (!accessibleResourcesRes.ok) {
    throw new Error(
      `Erreur lors de la récupération des ressources accessibles : ${accessibleResourcesRes.status} ${accessibleResourcesRes.statusText}`
    );
  }

  const accessibleResources = await accessibleResourcesRes.json();

  console.info('getJiraBoards 2', accessibleResources);

  if (!Array.isArray(accessibleResources) || accessibleResources.length === 0) {
    throw new Error('Aucune ressource Atlassian accessible trouvée');
  }

  // On choisit le premier cloudId disponible (à adapter si besoin)
  const cloudId = accessibleResources[0].id;

  // 2. Utiliser le cloudId pour récupérer la liste des boards
  const boardsUrl = `https://api.atlassian.com/ex/jira/${cloudId}/rest/agile/1.0/board`;
  const boardsRes = await fetch(boardsUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    },
  });

  console.info('getJiraBoards 3', boardsRes);

  if (!boardsRes.ok) {
    throw new Error(
      `Erreur lors de la récupération des boards : ${boardsRes.status} ${boardsRes.statusText}`
    );
  }

  const boardsData = await boardsRes.json();

  console.info('getJiraBoards 4', boardsData);

  return boardsData;
}
