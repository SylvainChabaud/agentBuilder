// lib/services/outlook/fetchEmails.js
export const fetchOutlookEmails = async (accessToken) => {
  try {
    const response = await fetch('/api/azure/emails', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error(
        `Erreur lors de la récupération des emails: ${response.status}`
      );
    }
    const emails = await response.json();
    return { emails, error: null };
  } catch (error) {
    console.error('Erreur dans fetchEmails :', error);
    return { emails: [], error: error.message };
  }
};
