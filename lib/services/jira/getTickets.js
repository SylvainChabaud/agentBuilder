import { getJiraBoards } from './getBoards';

export async function getJiraTickets(accessToken, boardId, sprintId) {
  console.info('getJiraTickets', { accessToken, boardId, sprintId });

  // try {
  //   const boards = await getJiraBoards(accessToken);
  //   console.log('Boards récupérés :', boards);
  // } catch (error) {
  //   console.error('Erreur dans getJiraTickets :', error.message);
  // }

  // 1. Récupérer le cloudId via accessible-resources (logique déjà présente)
  const accessibleResourcesRes = await fetch(
    'https://api.atlassian.com/oauth/token/accessible-resources',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      },
    }
  );

  console.info('getJiraTickets 1 ', accessibleResourcesRes);

  if (!accessibleResourcesRes.ok) {
    throw new Error('Impossible de récupérer le cloudId Atlassian');
  }

  const accessibleResources = await accessibleResourcesRes.json();

  console.info('getJiraTickets  ', accessibleResources);

  if (!Array.isArray(accessibleResources) || accessibleResources.length === 0) {
    throw new Error('Aucune ressource Atlassian accessible');
  }
  const site = accessibleResources[0];
  const cloudId = site.id;

  // 2. Si sprintId n'est pas fourni, tenter de récupérer le sprint actif
  if (!sprintId) {
    const sprintsUrl = `https://api.atlassian.com/ex/jira/${cloudId}/rest/agile/1.0/board/${boardId}/sprint?state=active`;

    const sprintsRes = await fetch(sprintsUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      },
    });

    console.info('getJiraTickets 6', sprintsRes);

    if (!sprintsRes.ok) {
      throw new Error('Impossible de récupérer les sprints du board');
    }

    const sprintsData = await sprintsRes.json();

    console.info('getJiraTickets 7', sprintsData);

    if (!sprintsData.values || sprintsData.values.length === 0) {
      throw new Error('Aucun sprint actif trouvé pour ce board');
    }
    // Prendre le premier sprint actif trouvé
    sprintId = sprintsData.values[0].id;
  }

  console.info('getJiraTickets 8', sprintId);

  // 3. Utiliser le sprintId (fourni ou récupéré automatiquement) pour récupérer les tickets
  const issuesUrl = `https://sylvain-chabaud.atlassian.net/rest/agile/1.0/board/${boardId}/sprint/${sprintId}/issue`; // const issuesUrl = `https://api.atlassian.com/ex/jira/${cloudId}/rest/agile/1.0/board/${boardId}/sprint/${sprintId}/issue`;

  // const issuesUrl = `https://api.atlassian.com/ex/jira/${cloudId}/rest/agile/1.0/board/${boardId}/sprint/${sprintId}/issue`;

  const issuesRes = await fetch(issuesUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    },
  });

  console.info('getJiraTickets 9', issuesRes);

  if (!issuesRes.ok) {
    throw new Error(
      'Impossible de récupérer les tickets JIRA pour ce sprint/board'
    );
  }

  const issuesData = await issuesRes.json();

  console.info('getJiraTickets 10', issuesData);

  return {
    issues: issuesData.issues.map((issue) => ({
      key: issue.key,
      summary: issue.fields?.summary,
      status: issue.fields?.status?.name,
    })),
  };
}
