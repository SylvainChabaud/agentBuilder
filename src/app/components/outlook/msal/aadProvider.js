'use client';

import { PublicClientApplication } from '@azure/msal-browser';
import { clientMsalConfig } from './msalConfigClient';

let msalInstance = null;

// Fonction pour initialiser MSAL
export const initializeMsal = async () => {
  console.info('initializeMsal', clientMsalConfig);
  if (!msalInstance) {
    msalInstance = new PublicClientApplication(clientMsalConfig);
    await msalInstance.initialize();
  }
  return msalInstance;
};

export { msalInstance };
