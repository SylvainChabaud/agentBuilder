// lib/server/msalConfig.js
import dotenv from 'dotenv';
dotenv.config();

export const serverMsalConfig = {
  auth: {
    clientId: process.env.AZURE_AD_CLIENT_ID,
    authority: `${process.env.AZURE_AD_AUTHORITY}/${process.env.AZURE_AD_TENANT_ID}`,
    clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
    redirectUri: process.env.NEXT_PUBLIC_BASE_URL,
  },
};
