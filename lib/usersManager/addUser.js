export const addUser = async (username, password) => {
  console.info('addUser');
  try {
    const response = await fetch('/api/users/addUser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    console.log('🔍 response :', response);
    const user = await response.json();

    if (!response.ok) {
      console.error('Erreur lors de l’ajout de l’utilisateur :', user.error);
      return null;
    }

    console.log('🔍 user :', user);

    return user ?? null;
  } catch (error) {
    console.error('Erreur réseau', error);
    return null;
  }
};
