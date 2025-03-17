/**
 * Supprime un token de l'API connections/delete
 * @param {string} appId - ID de l'application (ex: outlook)
 */
export const deleteTokenFromAPI = async (appId) => {
  try {
    const response = await fetch('/api/connections/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ appId }),
    });

    if (!response.ok) {
      console.error(
        'Erreur lors de la suppression de la connexion :',
        await response.json()
      );
    } else {
      console.log(`Connexion pour ${appId} supprimée avec succès.`);
    }
  } catch (error) {
    console.error(
      'Erreur réseau lors de la suppression de la connexion :',
      error
    );
  }
};
