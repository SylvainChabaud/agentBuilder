// app/api/gmail/auth/route.js
import { NextResponse } from 'next/server';
import { getOAuth2Client } from 'lib/gmail/googleConfig';
import { loginRequest } from 'src/app/components/gmail/oAuth/oAuthconfigClient';

export async function GET(request) {
  try {
    // Récupérer ?redirect=...
    const { searchParams } = new URL(request.url);
    const redirect = searchParams.get('redirect') || 'emails';
    // (valeur par défaut 'emails' si rien n’est fourni)

    console.info('AUTH', redirect);

    const oauth2Client = getOAuth2Client();

    // Passer redirect dans 'state' pour le récupérer dans callback
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: loginRequest,
      state: redirect, // <= on stocke le redirect dans 'state'
    });

    console.info('AUTH 2', authUrl);

    return NextResponse.redirect(authUrl);
  } catch (error) {
    console.error('Erreur /api/gmail/auth:', error);
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
