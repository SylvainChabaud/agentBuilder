/**
 * Supprime un token de l'API connections/delete
 * @param {string} appId - ID de l'application (ex: outlook)
 */
export const deleteExpertise = async (expertId) => {
  console.info('deleteExpertise', expertId);
  try {
    const response = await fetch('/api/expertises/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ expertId }),
    });

    console.info('deleteExpertise 2', response);

    if (!response.ok) {
      console.error(
        "Erreur lors de la suppression de l'expertise : ",
        await response.json()
      );
    } else {
      console.log(`Expertise pour ${expertId} supprimée avec succès.`);
    }
  } catch (error) {
    console.error(
      "Erreur réseau lors de la suppression de l'expertise :",
      error
    );
  }
};
