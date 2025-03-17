// app/api/emails/route.js

import { handleMsalLogin } from 'lib/msal/handleMsalLogin';
import { loginRequest } from 'src/app/components/outlook/msal/msalConfigClient';

export async function GET(request) {
  try {
    // Récupérer le token délégué envoyé par le client
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      throw new Error("Token client manquant dans l'en-tête Authorization.");
    }
    const clientAccessToken = authHeader.replace('Bearer ', '').trim();

    // Échanger ce token pour obtenir un token Graph avec le scope Mail.Read (par exemple)
    const accessToken = await handleMsalLogin(
      clientAccessToken,
      loginRequest.scopes
    );

    // Appeler l’API Graph pour récupérer les emails (utilisez /me/messages ici)
    const graphResponse = await fetch(
      'https://graph.microsoft.com/v1.0/me/messages',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!graphResponse.ok) {
      const errorText = await graphResponse.text();
      throw new Error(`Erreur Graph API: ${graphResponse.status} ${errorText}`);
    }

    const emails = await graphResponse.json();
    return new Response(JSON.stringify(emails), { status: 200 });
  } catch (error) {
    console.error('Erreur dans /api/azure/emails :', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
