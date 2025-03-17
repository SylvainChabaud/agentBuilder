import dotenv from 'dotenv';
import { NextResponse } from 'next/server';
import { getOAuth2Client } from 'lib/gmail/googleConfig';
import { saveTokenToAPI } from 'lib/connectionManager/saveToken';
import { APPS_LABELS } from 'lib/constants';

dotenv.config();

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state') || 'emails'; // state peut être null, vide ou une chaîne

    if (!code) {
      throw new Error("Missing 'code' param in callback");
    }

    console.info('CALLBACK 1 ', state);

    const oauth2Client = getOAuth2Client();
    const { tokens } = await oauth2Client.getToken(code);
    const accessToken = tokens.access_token;
    console.info('CALLBACK 2', accessToken);

    await saveTokenToAPI(APPS_LABELS.GMAIL, accessToken);

    // Si state est défini et non vide, on effectue une redirection
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL; // adapter selon dev/prod

    const redirectUrl = new URL(state, baseUrl);
    console.info('redirectUrl', redirectUrl);

    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error('Erreur dans /api/gmail/callback :', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
