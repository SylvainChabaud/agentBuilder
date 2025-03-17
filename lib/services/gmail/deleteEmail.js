/**
 * Supprime un email via l'API Gmail.
 *
 * @param {string} accessToken - Le token d'accès Gmail de l'utilisateur.
 * @param {string} messageId - L'identifiant du message à supprimer.
 * @returns {Promise<Object>} - La réponse JSON de l'API Gmail.
 * @throws {Error} - En cas d'erreur dans la suppression.
 */
export const handleDeleteEmail = async (accessToken, messageId) => {
  if (!accessToken) {
    throw new Error('Access token is required.');
  }
  if (!messageId) {
    throw new Error('Message ID is required.');
  }

  try {
    const response = await fetch('/api/gmail/deleteEmail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accessToken, messageId }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || "Erreur lors de la suppression de l'email."
      );
    }

    return data;
  } catch (error) {
    console.error('Erreur dans handleDeleteEmail :', error);
    throw error;
  }
};
