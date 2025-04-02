// src/app/api/mainAgent/run/route.js (POST complet avec FormData et initialisation workflow)
import { NextResponse } from 'next/server';
import { Readable } from 'stream';
import { IncomingForm } from 'formidable';
import path from 'path';
import fs from 'fs/promises';
import { initializeWorkflowForUser } from '../workflow/initForUser';
import { getInitParams } from './utils';

export const config = {
  api: {
    bodyParser: false,
  },
};

function toNodeRequest(req) {
  const nodeReq = Readable.from(req.body);
  nodeReq.headers = Object.fromEntries(req.headers);
  nodeReq.method = req.method;
  nodeReq.url = '';
  return nodeReq;
}

export async function POST(req) {
  const nodeReq = toNodeRequest(req);
  const form = new IncomingForm({ multiples: true });

  return new Promise((resolve) => {
    form.parse(nodeReq, async (err, fields, files) => {
      if (err) {
        console.error('❌ Erreur parsing FormData:', err);
        return resolve(
          NextResponse.json({ error: 'Erreur de parsing' }, { status: 500 })
        );
      }

      const { userId, objectiveText, contextFiles } = getInitParams(
        fields,
        files
      );

      console.info('run', { userId, objectiveText, contextFiles });

      try {
        const { workflowId, state } = await initializeWorkflowForUser(
          userId,
          objectiveText,
          contextFiles
        );

        return resolve(
          NextResponse.json({
            workflowId,
            logs: state.logs,
            memory: state.memory,
            output: state.output,
            validation: state.validation,
          })
        );
      } catch (err) {
        console.error('Erreur init workflow:', err);
        return resolve(
          NextResponse.json(
            { error: 'Erreur initialisation workflow' },
            { status: 500 }
          )
        );
      }
    });
  });
}
