// lib/services/gmail/sendEmail.js

import { deleteTokenFromAPI } from 'lib/connectionManager/deleteToken';
import { handleGmailLoginClient } from 'src/app/components/gmail/oAuth/handleGmailLoginClient';

/**
 * Envoie un email via l'endpoint /api/gmail/sendEmail.
 *
 * @param {string} accessToken - Le token d'accès obtenu après authentification.
 * @param {string} to - L'adresse email du destinataire.
 * @param {string} subject - Le sujet de l'email.
 * @param {string} body - Le contenu textuel de l'email.
 *
 * @returns {Promise<object>} La réponse de l'API.
 *
 * @throws {Error} Si l'un des paramètres est manquant ou en cas d'erreur de l'API.
 */
export const handleSendEmail = async (
  accessToken,
  to = '',
  subject = '',
  body = ''
) => {
  if (!accessToken) {
    throw new Error('Access token is required.');
  }

  // if (!to || !subject || !body) {
  //   throw new Error('Les champs "to", "subject" et "body" sont requis.');
  // }

  const response = await fetch('/api/gmail/sendEmail', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ accessToken, to, subject, body }),
  });

  const data = await response.json();

  if (!response.ok) {
    await deleteTokenFromAPI('gmail');
    await handleGmailLoginClient('/agentBuilder');
    throw new Error(
      data.error || 'Erreur inconnue lors de l’envoi de l’email.'
    );
  }

  return data;
};
