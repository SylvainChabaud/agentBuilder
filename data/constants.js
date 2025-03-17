export const RESUME_EXPERTISE = {
  OUTPUT_SCHEMA: { type: 'string', resume: 'string' },
};

export const MOOD_EXPERTISE = {
  OUTPUT_SCHEMA: { mood: 'string', intensity: 'string' },
};

export const GOOGLE_SHEETS_EXPERTISE = {
  OUTPUT_SCHEMA: { col1: 'string', col2: 'string' },
};

export const GMAIL_EMAILS_EXPERTISE = {
  OUTPUT_SCHEMA: { from: 'string', subject: 'string', snippet: 'string' },
};

export const GMAIL_SEND_EMAIL_EXPERTISE = {
  OUTPUT_SCHEMA: { to: 'string', subject: 'string', body: 'string' },
};
