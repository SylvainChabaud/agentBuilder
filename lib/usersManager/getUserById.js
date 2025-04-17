export const getUserById = async (userId) => {
  try {
    const res = await fetch('/api/users/getUser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('❌ Erreur getUserById:', data.error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('❌ Erreur réseau getUserById:', error);
    return null;
  }
};
