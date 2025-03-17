/**
 * Vérifie si un token existe déjà dans l'API connections/get
 * @param {string} appId - ID de l'application (ex: outlook)
 * @returns {Promise<string|null>} - Retourne le token ou null s'il n'existe pas
 */
export const checkTokenInAPI = async (appId) => {
  console.info('checkTokenInAPI', appId);
  try {
    const response = await fetch('/api/connections/get');
    if (!response.ok) {
      console.error(
        'Erreur lors de la récupération des connexions :',
        await response.json()
      );
      return null;
    }

    const connections = await response.json();
    console.info('connections', connections);

    const connection = connections.find((conn) => conn.appId === appId);
    return connection?.accessToken ?? null;
  } catch (error) {
    console.error(
      "Erreur réseau lors de la vérification du token dans l'API :",
      error
    );
    return null;
  }
};
