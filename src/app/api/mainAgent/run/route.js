// src/app/api/mainAgent/run/route.js (POST complet avec FormData et initialisation workflow)
import { NextResponse } from 'next/server';
import { Readable } from 'stream';
import { IncomingForm } from 'formidable';
import {
  getInitParams,
  initializeWorkflowForUser,
} from '../workflow/initForUser';
import { analyzeObjective } from '../workflow/analystAgent';

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

      try {
        const { userId, objectiveText, contextFiles } = await getInitParams(
          fields,
          files
        );

        console.info('✅ Fichiers enrichis :', contextFiles);

        const { workflowId, state } = await initializeWorkflowForUser(
          userId,
          objectiveText,
          contextFiles
        );

        const { tasks, expertises } = await analyzeObjective({
          objective: objectiveText,
          context: contextFiles,
        });

        console.info('result RUN WORKFLOW', { tasks, expertises });

        return resolve(
          NextResponse.json({
            workflowId,
            logs: state.logs,
            memory: state.memory,
            output: { tasks, expertises },
            // output: state.output,
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
