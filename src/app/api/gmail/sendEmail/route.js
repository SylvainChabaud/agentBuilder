import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { getOAuth2Client } from 'lib/gmail/googleConfig';

/**
 * POST /api/gmail/send
 * Body JSON : {
 *   "accessToken": "<userAccessToken>",
 *   "to": "destinataire@example.com",
 *   "subject": "Mon sujet",
 *   "body": "Contenu texte du message"
 * }
 */
export async function POST(request) {
  try {
    // 1. Récupérer les champs du corps de la requête
    const { accessToken, to, subject, body } = await request.json();
    if (!accessToken) {
      return new NextResponse(
        JSON.stringify({ error: 'Missing accessToken' }),
        { status: 400 }
      );
    }
    if (!to || !subject || !body) {
      return new NextResponse(
        JSON.stringify({ error: "Missing 'to', 'subject' or 'body'" }),
        { status: 400 }
      );
    }

    // 2. Configurer le client OAuth2
    const oauth2Client = getOAuth2Client();
    oauth2Client.setCredentials({ access_token: accessToken });

    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    // 3. Construire le message MIME brut
    // Format minimal : en-têtes + double saut de ligne + contenu
    // Exemples d'en-têtes :
    // From: me (pas toujours obligatoire si Google le déduit)
    // To: ...
    // Subject: ...
    // Content-Type: text/plain
    const messageParts = [];
    messageParts.push(`To: ${to}`);
    // Optionnel: un From (sinon Gmail utilisera le compte authentifié)
    // messageParts.push(`From: "Moi" <moncompte@gmail.com>`);
    messageParts.push(`Subject: ${subject}`);
    messageParts.push(`Content-Type: text/plain; charset="UTF-8"`);
    messageParts.push(''); // ligne vide
    messageParts.push(body);

    const rawMessage = messageParts.join('\r\n');

    // 4. Encoder en base64 (URL safe)
    const encodedMessage = Buffer.from(rawMessage)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    // 5. Appeler l'API Gmail pour envoyer
    const sendResponse = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage,
      },
    });

    // 6. Retourner le résultat
    return new NextResponse(
      JSON.stringify({
        status: 'success',
        sendResponse: sendResponse.data,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur dans /api/gmail/send :', error);
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
