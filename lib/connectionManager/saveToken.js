import dotenv from 'dotenv';
dotenv.config();

/**
 * Sauvegarde un token dans l'API connections/save
 * @param {string} appId - ID de l'application (ex: outlook)
 * @param {string} accessToken - Token à sauvegarder
 */
export const saveTokenToAPI = async (appId, accessToken) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const apiUrl = `${baseUrl}/api/connections/save`;

  console.info('saveTokenToAPI', { appId, accessToken });
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ appId, accessToken }),
    });

    if (!response.ok) {
      console.error(
        'Erreur lors de la sauvegarde de la connexion :',
        await response.json()
      );
    } else {
      console.log(`Connexion pour ${appId} sauvegardée avec succès.`);
    }
  } catch (error) {
    console.error(
      'Erreur réseau lors de la sauvegarde de la connexion :',
      error
    );
  }
};
