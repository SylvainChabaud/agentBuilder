import dotenv from 'dotenv';
dotenv.config();

/**
 * Sauvegarde une expertise dans l'API expertises/set
 * @param {string} userEmail - userEmail de l'application
 */
export const setExpertise = async (expertise) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const apiUrl = `${baseUrl}/api/expertises/set`;

  console.info('setExpertiseToAPI', { expertise });
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ expertise }),
    });

    if (!response.ok) {
      console.error(
        "Erreur lors de la sauvegarde de l'expertise :",
        await response.json()
      );
    } else {
      console.log(`Expertise pour ${expertise} sauvegardée avec succès.`);
    }
  } catch (error) {
    console.error(
      "Erreur réseau lors de la sauvegarde de l'expertise :",
      error
    );
  }
};
