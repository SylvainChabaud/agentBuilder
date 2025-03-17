import dotenv from 'dotenv';
import { ConfidentialClientApplication } from '@azure/msal-node';
import { serverMsalConfig } from './msalConfigServer';

dotenv.config();

/**
 * Obtient un token d'accès pour Microsoft Graph via le flux on-behalf-of (OBO).
 *
 * @param {string} clientAccessToken - Le token délégué obtenu côté client.
 * @param {string[]} scopes - Les scopes demandés pour Microsoft Graph (ex. ["Mail.Read"] ou ["Mail.Send"]).
 * @returns {Promise<string>} - Retourne le token d'accès pour Microsoft Graph.
 */
export const handleMsalLogin = async (
  clientAccessToken,
  scopes = [process.env.NEXT_PUBLIC_AZURE_AD_SCOPES]
) => {
  console.info('handleMsalLogin', serverMsalConfig);

  const msalClient = new ConfidentialClientApplication(serverMsalConfig);
  try {
    const tokenResponse = await msalClient.acquireTokenOnBehalfOf({
      scopes,
      oboAssertion: clientAccessToken,
    });
    if (!tokenResponse || !tokenResponse.accessToken) {
      throw new Error('Token Graph introuvable après échange OBO.');
    }
    return tokenResponse.accessToken;
  } catch (error) {
    console.error('Erreur dans handleMsalLoginServer :', error);
    throw error;
  }
};
