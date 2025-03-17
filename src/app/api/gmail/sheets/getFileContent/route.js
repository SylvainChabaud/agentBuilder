// app/api/gmail/sheets/getFileContent/route.js
import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const accessToken = searchParams.get('accessToken');
    const sheetId = searchParams.get('sheetId');
    const sheetName = searchParams.get('sheetName') || 'Feuille1';

    console.info('GET', { accessToken, sheetId, sheetName });
    if (!accessToken || !sheetId) {
      return NextResponse.json({ error: 'Missing params' }, { status: 400 });
    }

    const authClient = new google.auth.OAuth2();
    authClient.setCredentials({ access_token: accessToken });

    const sheets = google.sheets({ version: 'v4', auth: authClient });
    // On lit l'onglet sheetName, plage "A1:Z100"
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: `${sheetName}`, // Ajuste la plage si besoin
    });

    const rows = response.data.values || [];
    return NextResponse.json({ data: rows });
  } catch (error) {
    console.error('getFileContent error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
