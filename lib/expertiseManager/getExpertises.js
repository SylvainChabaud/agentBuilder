export const getExpertises = async () => {
  console.info('getExpertises');

  try {
    const response = await fetch('/api/expertises/get');
    if (!response.ok) {
      console.error(
        'Erreur lors de la récupération des expertises :',
        await response.json()
      );
      return null;
    }

    const expertises = await response.json();
    return expertises ?? null;
  } catch (error) {
    console.error('Erreur réseau', error);
    return null;
  }
};
