import dotenv from 'dotenv';
dotenv.config();

export const getUsers = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  console.info('getUsers', baseUrl);

  try {
    const response = await fetch(`${baseUrl}/api/users/getUsers`);
    if (!response.ok) {
      console.error(
        'Erreur lors de la récupération des utilisateurs :',
        await response.json()
      );
      return null;
    }
    const users = await response.json();
    return users ?? null;
  } catch (error) {
    console.error('Erreur réseau', error);
    return null;
  }
};
