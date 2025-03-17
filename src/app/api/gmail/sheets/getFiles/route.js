// app/api/gmail/sheets/getFiles/route.js
import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { getOAuth2Client } from 'lib/gmail/googleConfig';

export async function GET(request) {
  console.info('GET SHEETS');
  try {
    const { searchParams } = new URL(request.url);
    const accessToken = searchParams.get('accessToken');

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Missing accessToken param' },
        { status: 400 }
      );
    }

    console.info('getSheets: Access Token =', accessToken);

    // 1) Initialiser l'auth
    const oauth2Client = getOAuth2Client();
    oauth2Client.setCredentials({ access_token: accessToken });

    // 2) Lister les fichiers Google Sheets (Drive API)
    const drive = google.drive({ version: 'v3', auth: oauth2Client });
    const driveResponse = await drive.files.list({
      pageSize: 5,
      q: "mimeType='application/vnd.google-apps.spreadsheet'",
      fields: 'files(id, name, modifiedTime)',
      orderBy: 'modifiedTime desc',
    });
    const files = driveResponse.data.files || [];

    // 3) Pour chaque fichier, appeler Sheets API et récupérer la liste d'onglets
    const sheetsApi = google.sheets({ version: 'v4', auth: oauth2Client });

    // On fait un Promise.all pour appeler l'API Sheets en parallèle
    const results = await Promise.all(
      files.map(async (file) => {
        try {
          // Appel Sheets API pour obtenir "sheets[].properties.title"
          const sheetResp = await sheetsApi.spreadsheets.get({
            spreadsheetId: file.id,
            fields: 'sheets.properties',
          });

          const subSheets = sheetResp.data.sheets || [];
          const sheetNames = subSheets.map((s) => s.properties.title);

          return {
            id: file.id,
            name: file.name,
            modifiedTime: file.modifiedTime,
            sheetNames,
          };
        } catch (err) {
          console.error('Erreur sheets.spreadsheets.get pour', file.id, err);
          // Renvoyer tout de même un objet (on peut mettre sheetNames = [])
          return {
            id: file.id,
            name: file.name,
            sheetNames: [],
            error: err.message,
          };
        }
      })
    );

    // 4) Retourner la liste enrichie (id, name, sheetNames)
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.error('/api/gmail/sheets/getSheets error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
