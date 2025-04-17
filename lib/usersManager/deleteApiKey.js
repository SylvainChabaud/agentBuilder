// src/app/api/services/deleteApiKey.js

export const deleteApiKey = async (userId) => {
  try {
    const res = await fetch('/api/users/deleteApiKey', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('❌ Erreur suppression clé API :', data.error);
      return null;
    }

    console.info('✅ Clé supprimée avec succès');
    return data;
  } catch (err) {
    console.error('❌ Erreur réseau :', err);
    return null;
  }
};
