// app/api/jira/tickets/route.js

import { getJiraTickets } from 'lib/services/jira/getTickets';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const accessToken = searchParams.get('accessToken');
    const boardId = searchParams.get('boardId') || '';
    const sprintId = searchParams.get('sprintId') || '';

    console.info('ticket GET', { accessToken, boardId, sprintId });

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Missing accessToken' },
        { status: 400 }
      );
    }

    const data = await getJiraTickets(accessToken, boardId, sprintId);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Erreur /api/jira/tickets:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
