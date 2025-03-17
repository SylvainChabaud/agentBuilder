// app/api/gmail/emails/route.js
import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { getOAuth2Client } from 'lib/gmail/googleConfig';

export async function GET(request) {
  console.info('GET EMAILS');
  try {
    const { searchParams } = new URL(request.url);
    const accessToken = searchParams.get('accessToken');

    console.info('GET EMAILS 1', accessToken);

    if (!accessToken) {
      return new NextResponse(
        JSON.stringify({ error: 'Missing accessToken param' }),
        { status: 400 }
      );
    }

    console.info('GET EMAILS 2', accessToken);

    const oauth2Client = getOAuth2Client();
    oauth2Client.setCredentials({ access_token: accessToken });

    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    // 1. Récupérer la liste d'IDs (comme avant)
    const listRes = await gmail.users.messages.list({
      userId: 'me',
      maxResults: 5, // par ex.
    });

    const messageRefs = listRes.data.messages || [];

    const messages = [];

    for (const ref of messageRefs) {
      // 2. Récupérer chaque message en détail (format: 'full')
      const getRes = await gmail.users.messages.get({
        userId: 'me',
        id: ref.id,
        format: 'full',
      });

      const msgData = getRes.data; // contient payload, snippet, etc.

      // Chercher l'en-tête Subject, From
      const headers = msgData.payload.headers || [];
      const subjectHeader = headers.find((h) => h.name === 'Subject');
      const fromHeader = headers.find((h) => h.name === 'From');

      // Snippet pour un aperçu
      const snippet = msgData.snippet;

      // 3. Extraire le HTML
      // Généralement le HTML est dans le mimeType "text/html" d'une part
      // On va faire une fonction récursive pour trouver la partie HTML.

      function findHtmlPart(payload) {
        // si c'est un multipart, parcourir payload.parts
        if (payload.parts) {
          for (const part of payload.parts) {
            const found = findHtmlPart(part);
            if (found) return found;
          }
        }
        // si la part est text/html
        if (payload.mimeType === 'text/html') {
          return payload.body.data; // base64url-encoded
        }
        return null;
      }

      const htmlPartEncoded = findHtmlPart(msgData.payload);
      let htmlContent = '';
      if (htmlPartEncoded) {
        // Décoder en base64
        const buff = Buffer.from(htmlPartEncoded, 'base64');
        htmlContent = buff.toString('utf-8');
      }

      messages.push({
        id: msgData.id,
        threadId: msgData.threadId,
        subject: subjectHeader ? subjectHeader.value : '(Sans sujet)',
        from: fromHeader ? fromHeader.value : '(Inconnu)',
        snippet,
        htmlContent, // Le HTML complet décodé
      });
    }

    return new NextResponse(JSON.stringify({ messages }), { status: 200 });
  } catch (error) {
    console.error('Erreur /api/gmail/emails:', error);
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
