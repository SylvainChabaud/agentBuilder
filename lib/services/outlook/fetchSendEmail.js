export const sendOutlookEmail = async ({
  to,
  subject,
  content,
  accessToken,
}) => {
  try {
    const response = await fetch('/api/azure/sendEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ to, subject, content }),
    });
    if (response.ok) {
      return { success: true, message: 'Email envoyé avec succès !' };
    } else {
      const errorData = await response.json();
      return { success: false, message: `Erreur : ${errorData.message}` };
    }
  } catch (error) {
    console.error('Erreur dans sendOutlookEmail:', error);
    return { success: false, message: "Erreur lors de l'envoi de l'email." };
  }
};
