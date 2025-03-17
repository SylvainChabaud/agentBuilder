// app/api/sendEmail/route.js

import { handleMsalLogin } from 'lib/msal/handleMsalLogin';
import { loginRequest } from 'src/app/components/outlook/msal/msalConfigClient';

export async function POST(request) {
  try {
    // Récupérer le token délégué envoyé par le client
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      throw new Error("Token client manquant dans l'en-tête Authorization.");
    }
    const clientAccessToken = authHeader.replace('Bearer ', '').trim();

    // Utiliser le flux OBO pour obtenir un token Graph avec le scope Mail.Send
    const accessToken = await handleMsalLogin(
      clientAccessToken,
      loginRequest.scopes
    );

    // Lire le corps de la requête
    const { to, subject, content } = await request.json();

    // Construire le payload pour l'API Graph
    const payload = {
      message: {
        subject,
        body: {
          contentType: 'Text',
          content,
        },
        toRecipients: [
          {
            emailAddress: {
              address: to,
            },
          },
        ],
      },
      saveToSentItems: 'true',
    };

    // Envoyer l'email via l'API Graph
    const graphResponse = await fetch(
      'https://graph.microsoft.com/v1.0/me/sendMail',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      }
    );

    if (!graphResponse.ok) {
      const errorText = await graphResponse.text();
      throw new Error(`Erreur Graph API: ${graphResponse.status} ${errorText}`);
    }

    return new Response(
      JSON.stringify({ message: 'Email envoyé avec succès !' }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur dans /api/azure/sendEmail :', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
