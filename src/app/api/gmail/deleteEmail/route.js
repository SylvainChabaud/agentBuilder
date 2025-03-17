import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { getOAuth2Client } from 'lib/gmail/googleConfig';

/**
 * POST ou DELETE /api/gmail/delete
 * Body JSON : {
 *   "accessToken": "...",
 *   "messageId": "..."  // l'ID du message à supprimer
 * }
 */
export async function POST(request) {
  try {
    // 1. Lire le corps
    const { accessToken, messageId } = await request.json();
    if (!accessToken || !messageId) {
      return new NextResponse(
        JSON.stringify({
          error: 'Missing accessToken or messageId',
        }),
        { status: 400 }
      );
    }

    // 2. Configurer oauth2Client
    const oauth2Client = getOAuth2Client();
    oauth2Client.setCredentials({ access_token: accessToken });
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    // 3. Appeler l'API pour supprimer
    // https://developers.google.com/gmail/api/reference/rest/v1/users.messages/delete
    const deleteResponse = await gmail.users.messages.delete({
      userId: 'me',
      id: messageId,
    });

    // deleteResponse.data est vide (204 No Content),
    // Si la requête aboutit, c'est un succès.
    return new NextResponse(
      JSON.stringify({
        status: 'success',
        deleteResponse: deleteResponse.data,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur dans /api/gmail/deleteEmail :', error);
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
