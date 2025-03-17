export const getWorkflows = async () => {
  console.info('getWorkflows');

  try {
    const response = await fetch('/api/workflows/get');
    if (!response.ok) {
      console.error(
        'Erreur lors de la récupération des workflows :',
        await response.json()
      );
      return null;
    }

    const workflows = await response.json();
    return workflows ?? null;
  } catch (error) {
    console.error('Erreur réseau', error);
    return null;
  }
};
