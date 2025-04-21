export const deleteApiKey = async (userId) => {
  try {
    const response = await fetch('/api/users/deleteApiKey', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Erreur suppression clé API :', result.error);
      return null;
    }

    console.log('🗑 Clé API supprimée côté serveur');
    return result ?? null;
  } catch (error) {
    console.error('Erreur réseau (deleteApiKey)', error);
    return null;
  }
};
