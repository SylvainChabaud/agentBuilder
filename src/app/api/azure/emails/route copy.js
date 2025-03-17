import { Client } from '@microsoft/microsoft-graph-client';
import 'isomorphic-fetch'; // Nécessaire pour les requêtes dans Node.js

const getAuthenticatedClient = (accessToken) => {
  return Client.init({
    authProvider: (done) => {
      done(null, accessToken);
    },
  });
};

export async function GET(request) {
  const authorization = request.headers.get('authorization');

  if (!authorization) {
    return new Response(JSON.stringify({ error: "Jeton d'accès manquant" }), {
      status: 401,
    });
  }

  const accessToken = authorization.split('Bearer ')[1];

  try {
    const client = getAuthenticatedClient(accessToken);
    const messages = await client.api('/me/messages').top(50).get(); // Récupère les 50 premiers emails
    return new Response(JSON.stringify(messages.value), { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la récupération des emails :', error);
    return new Response(
      JSON.stringify({ error: 'Erreur interne du serveur' }),
      { status: 500 }
    );
  }
}
