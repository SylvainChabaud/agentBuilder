// /app/api/jira/auth/route.js
import { NextResponse } from 'next/server';
import dotenv from 'dotenv';
import { loginRequest } from 'src/app/components/jira/oAuth/oAuthconfigClient';

dotenv.config();

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const redirect = searchParams.get('redirect') || '/agentBuilder';

    // On génère l’URL OAuth d’Atlassian.
    // Sur JIRA Cloud, on utilise l’Auth2 d’Atlassian :
    // https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps/

    // Par exemple :
    const clientId = process.env.JIRA_CLIENT_ID;
    const jiraAuthURL = 'https://auth.atlassian.com/authorize';
    const scopes = loginRequest;

    // Construction de l’URL
    const params = new URLSearchParams({
      audience: 'api.atlassian.com',
      client_id: clientId,
      scope: scopes.join(' '),
      redirect_uri: process.env.NEXT_PUBLIC_BASE_URL + '/api/jira/callback',
      response_type: 'code',
      prompt: 'consent',
      state: redirect,
    });

    const authUrl = `${jiraAuthURL}?${params.toString()}`;

    return NextResponse.redirect(authUrl);
  } catch (error) {
    console.error('Erreur /api/jira/auth:', error);
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
