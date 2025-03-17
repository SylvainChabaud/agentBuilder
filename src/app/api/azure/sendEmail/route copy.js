import { Client } from '@microsoft/microsoft-graph-client';
import 'isomorphic-fetch';

const getAuthenticatedClient = (accessToken) => {
  return Client.init({
    authProvider: (done) => {
      done(null, accessToken);
    },
  });
};

export async function POST(request) {
  const authorization = request.headers.get('authorization');

  if (!authorization) {
    return new Response(JSON.stringify({ error: "Jeton d'accès manquant" }), {
      status: 401,
    });
  }

  const accessToken = authorization.split('Bearer ')[1];

  try {
    const body = await request.json();
    const { to, subject, content } = body;

    if (!to || !subject || !content) {
      return new Response(
        JSON.stringify({
          error: "Les champs 'to', 'subject', et 'content' sont obligatoires.",
        }),
        { status: 400 }
      );
    }

    const client = getAuthenticatedClient(accessToken);

    // Construire le message
    const email = {
      message: {
        subject: subject,
        body: {
          contentType: 'Text',
          content: content,
        },
        toRecipients: [
          {
            emailAddress: {
              address: to,
            },
          },
        ],
      },
    };

    // Envoyer l'email
    await client.api('/me/sendMail').post(email);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email :", error);
    return new Response(
      JSON.stringify({ error: "Erreur lors de l'envoi de l'email" }),
      { status: 500 }
    );
  }
}
