// /app/api/jira/callback/route.js
import dotenv from 'dotenv';
import { NextResponse } from 'next/server';
import { saveTokenToAPI } from 'lib/connectionManager/saveToken';
import { APPS_LABELS } from 'lib/constants';

dotenv.config();

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state') || '/agentBuilder';

    if (!code) {
      throw new Error("Missing 'code' param in callback");
    }

    const clientId = process.env.JIRA_CLIENT_ID;
    const clientSecret = process.env.JIRA_CLIENT_SECRET;

    // On appelle l’endpoint d’échange de token Atlassian
    // Doc Atlassian OAuth 2.0 : https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps/#exchange-the-authorization-code-for-an-access-token
    const tokenEndpoint = 'https://auth.atlassian.com/oauth/token';
    const res = await fetch(tokenEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: process.env.NEXT_PUBLIC_BASE_URL + '/api/jira/callback',
      }),
    });
    if (!res.ok) {
      throw new Error('Failed to exchange code for token');
    }

    const tokens = await res.json();
    const accessToken = tokens.access_token; // l’access token Atlassian

    console.info('TOKENS CALL', tokens);
    // Il peut aussi y avoir refresh_token, expires_in, etc. à gérer selon vos besoins

    // On enregistre le token côté serveur pour cet utilisateur
    await saveTokenToAPI(APPS_LABELS.JIRA, accessToken);

    // On redirige l’utilisateur vers la page qu’il consultait (state)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const redirectUrl = new URL(state, baseUrl);

    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error('Erreur dans /api/jira/callback :', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
