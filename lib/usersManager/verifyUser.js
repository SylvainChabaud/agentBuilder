import dotenv from 'dotenv';
dotenv.config();

export const verifyUser = async (username, password) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  console.info('verifyUser');
  try {
    const response = await fetch(`${baseUrl}/api/users/verifyUser`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
      console.error(
        "Erreur lors de la vérification de l'utilisateur :",
        await response.json()
      );
      return null;
    }
    const result = await response.json();
    return result ?? null;
  } catch (error) {
    console.error('Erreur réseau', error);
    return null;
  }
};
