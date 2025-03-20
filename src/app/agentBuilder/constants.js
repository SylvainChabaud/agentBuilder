import {
  CONVERT_DISPLAYS_INPUTS_CONTEXT,
  CONVERT_GMAIL_INPUTS_CONTEXT,
} from './components/run/prompts';
import { MODELS } from '../chatInterface/constants';
import {
  GMAIL_EMAILS_EXPERTISE,
  GMAIL_SEND_EMAIL_EXPERTISE,
  RESUME_EXPERTISE,
  WEB_SEARCH_EXPERTISE,
} from 'data/constants';
import EmailsDisplay from '../displays/emails/page';

export const INITIAL_COLOR = '#dbdbdb';

export const NODE_POSITION_OFFSET = 25;

export const INITIAL_NODE_POSITION = { x: 300, y: 200 };

export const INITIAL_NODE = {
  id: '',
  data: { label: 'Node 1' },
  position: { x: 0, y: 0 },
  style: { backgroundColor: '' },
};

export const INITIAL_EDGES = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
  },
];

export const INITIAL_EDGES_POSITION = {
  sourcePosition: 'right',
  targetPosition: 'left',
};

export const INITIAL_NODES = [
  {
    id: '1',
    data: { label: 'Node 1' },
    position: { x: 100, y: 200 },
    style: { backgroundColor: INITIAL_COLOR },
    ...INITIAL_EDGES_POSITION,
  },
  {
    id: '2',
    data: { label: 'Node 2' },
    position: { x: 300, y: 200 },
    style: { backgroundColor: INITIAL_COLOR },
    ...INITIAL_EDGES_POSITION,
  },
];

export const NODE_PARAMS = {
  NAME: 'nodeName',
  BG_COLOR: 'nodeBg',
  DELETE: 'nodeDelete',
  SELECT_APP: 'nodeAppSelector',
  EXPERTISE: 'nodeExpertise',
  FILE: 'nodeFile',
  SHEET: 'nodeSheet',
};

export const APPS_LIST = [
  { id: 'gmail', name: 'Gmail' },
  { id: 'outlook', name: 'Outlook' },
  { id: 'iaModel', name: 'IaModel' },
  { id: 'jira', name: 'Jira' },
  { id: 'sheet', name: 'Sheet' },
  { id: 'displays', name: 'Displays' },
];

export const EXPERTISES_LIST = [
  // {
  //   id: 'formatGmailInputs',
  //   name: 'Format gmail inputs',
  //   outputs: {
  //     OUTPUT_SCHEMA: { to: 'string', subject: 'string', body: 'string' },
  //   },
  //   context: {
  //     role: 'user',
  //     content: CONVERT_GMAIL_INPUTS_CONTEXT,
  //   },
  //   model: MODELS[12].id,
  // },
  {
    id: 'gmailEmails',
    name: 'Mes emails',
    outputs: GMAIL_EMAILS_EXPERTISE.OUTPUT_SCHEMA,
  },
  {
    id: 'sendEmail',
    name: 'Envoyer un email',
    inputs: GMAIL_EMAILS_EXPERTISE.OUTPUT_SCHEMA,
    // outputs: GMAIL_SEND_EMAIL_EXPERTISE.OUTPUT_SCHEMA,
    outputs: GMAIL_SEND_EMAIL_EXPERTISE.OUTPUT_SCHEMA,
    context: [
      {
        role: 'user',
        content: CONVERT_GMAIL_INPUTS_CONTEXT,
      },
    ],
    model: MODELS[10].id,
  },
  {
    id: 'sheets',
    name: 'Mes sheets',
    // outputs: GOOGLE_SHEETS_EXPERTISE.OUTPUT_SCHEMA,
  },
  {
    id: 'displayEmails',
    name: 'Affiche les emails',
    inputs: RESUME_EXPERTISE.OUTPUT_SCHEMA,
    outputs: RESUME_EXPERTISE.OUTPUT_SCHEMA,
    component: EmailsDisplay,
    context: [
      {
        role: 'user',
        content: CONVERT_DISPLAYS_INPUTS_CONTEXT,
      },
    ],
    model: MODELS[10].id,
  },
  {
    id: 'webSearch',
    name: 'Recherche Web',
    outputs: WEB_SEARCH_EXPERTISE.OUTPUT_SCHEMA,
  },
  // {
  //   id: 'sendSheet',
  //   name: 'envoyer un sheet',
  //   // outputs: GOOGLE_SHEETS_EXPERTISE.OUTPUT_SCHEMA,
  // },
  // {
  //   id: 'resume',
  //   name: 'Classement',
  //   outputs: RESUME_EXPERTISE.OUTPUT_SCHEMA,
  //   context: {
  //     role: 'user',
  //     content: RESUME_CONTEXT,
  //   },
  //   model: MODELS[1].id,
  // },
  // {
  //   id: 'mood',
  //   name: 'Emotion',
  //   outputs: MOOD_EXPERTISE.OUTPUT_SCHEMA,
  //   context: {
  //     role: 'user',
  //     content: MOOD_CONTEXT,
  //   },
  //   model: MODELS[1].id,
  // },
];

export const WORKFLOWS_LIST = [
  // { id: '', name: '', data: { nodes: [{}], edges: [{}] } },
];

export const APPS_SVG = {
  gmail: '/brandsLogos/gmail.svg',
  outlook: '/brandsLogos/outlook.svg',
  // deepseek: '/brandsLogos/deepseek.svg',
  iaModel: '/brandsLogos/iaModel.svg',
  jira: '/brandsLogos/jira.svg',
  sheet: '/brandsLogos/sheet.svg',
  displays: '/brandsLogos/displays.svg',
};

export const NODE_STATUS = {
  RUN: 'run',
  FINISH: 'finish',
};
