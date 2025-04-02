import dotenv from 'dotenv';
dotenv.config();

export const verifyUser = async (username, password) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  try {
    const response = await fetch(`${baseUrl}/api/users/verifyUser`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('❌ Vérification échouée:', error);
      return null;
    }

    const result = await response.json();

    return {
      id: result.id, // ✅ UUID renvoyé par le backend
      username: result.username,
    };
  } catch (error) {
    console.error('❌ Erreur réseau:', error);
    return null;
  }
};
