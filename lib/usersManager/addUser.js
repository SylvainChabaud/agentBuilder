export const addUser = async (username, password) => {
  console.info('addUser');
  try {
    const response = await fetch('/api/users/addUser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    console.log('🔍 response :', response);

    if (!response.ok) {
      console.error(
        'Erreur lors de l’ajout de l’utilisateur :',
        await response.json()
      );
      return null;
    }

    const user = await response.json();

    console.log('🔍 user :', user);

    return user ?? null;
  } catch (error) {
    console.error('Erreur réseau', error);
    return null;
  }
};
