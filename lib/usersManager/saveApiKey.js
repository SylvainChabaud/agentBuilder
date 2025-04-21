export const saveApiKey = async (userId, llmSettings) => {
  console.info('saveApiKey', { userId, llmSettings });

  try {
    const response = await fetch('/api/users/saveApiKey', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, llmSettings }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error(
        'Erreur lors de l’enregistrement de la configuration LLM :',
        result.error
      );
      return null;
    }

    console.log('✅ Configuration LLM enregistrée côté serveur');
    return result ?? null;
  } catch (error) {
    console.error('Erreur réseau', error);
    return null;
  }
};
