import dotenv from 'dotenv';
dotenv.config();

export const msalConfig = {
  auth: {
    clientId: process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID, // ID du client
    authority: process.env.NEXT_PUBLIC_AZURE_AD_AUTHORITY, // Autorité (tenant ID ou common)
    redirectUri: process.env.NEXT_PUBLIC_BASE_URL, // Redirige vers l'URL de base
  },
  cache: {
    cacheLocation: 'localStorage', // Stocke les tokens dans le stockage local
    storeAuthStateInCookie: false, // Désactive les cookies pour la gestion des tokens
  },
};

export const loginRequest = {
  scopes: ['User.Read', 'Mail.Read', 'Mail.Send'], // Scopes nécessaires
};
