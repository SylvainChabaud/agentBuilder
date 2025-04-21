import dotenv from 'dotenv';
dotenv.config();

/**
 * Sauvegarde un workflow dans l'API workflows/set
 * @param {string} userEmail - userEmail de l'application
 */
export const setWorkflow = async (workflow) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const apiUrl = `${baseUrl}/api/workflows/set`;

  console.info('setWorkflowToApi', { workflow });
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ workflow }),
    });

    if (!response.ok) {
      console.error(
        'Erreur lors de la sauvegarde du workflow :',
        await response.json()
      );
    } else {
      console.log(`Expertise pour ${workflow} sauvegardée avec succès.`);
    }
  } catch (error) {
    console.error('Erreur réseau lors de la sauvegarde du workflow :', error);
  }
};
