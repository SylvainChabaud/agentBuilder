/**
 * Supprime un token de l'API connections/delete
 * @param {string} appId - ID de l'application (ex: outlook)
 */
export const deleteWorkflow = async (workflowId) => {
  console.info('deleteWorkflow', workflowId);

  try {
    const response = await fetch('/api/workflows/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ workflowId }),
    });

    console.info('deleteWorkflow 2', response);

    if (!response.ok) {
      console.error(
        'Erreur lors de la suppression du workflow : ',
        await response.json()
      );
    } else {
      console.log(`Expertise pour ${workflowId} supprimée avec succès.`);
    }
  } catch (error) {
    console.error('Erreur réseau lors de la suppression du workflow :', error);
  }
};
