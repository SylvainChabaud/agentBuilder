export const saveApiKey = async (userId, apiKey) => {
  console.info('saveApiKey', { userId, apiKey });

  try {
    const response = await fetch('/api/users/saveApiKey', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, apiKey }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error(
        'Erreur lors de l’enregistrement de la clé API :',
        result.error
      );
      return null;
    }

    console.log('✅ Clé API enregistrée côté serveur');
    return result ?? null;
  } catch (error) {
    console.error('Erreur réseau', error);
    return null;
  }
};
