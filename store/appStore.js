import create from 'zustand';

// Store Zustand pour gérer les clients et tokens
export const useAppStore = create((set) => ({
  clients: {}, // Contient les instances de chaque client
  tokens: {}, // Contient les tokens d'accès pour chaque application

  // Ajouter une instance client
  addClient: (name, clientInstance) =>
    set((state) => ({
      clients: { ...state.clients, [name]: clientInstance },
    })),

  // Ajouter un token
  addToken: (name, token) =>
    set((state) => ({
      tokens: { ...state.tokens, [name]: token },
    })),

  // Récupérer une instance client
  getClient: (name) => {
    const state = get();
    return state.clients[name];
  },

  // Récupérer un token
  getToken: (name) => {
    const state = get();
    return state.tokens[name];
  },

  // Supprimer une connexion
  removeConnection: (name) =>
    set((state) => {
      const newClients = { ...state.clients };
      const newTokens = { ...state.tokens };
      delete newClients[name];
      delete newTokens[name];
      return { clients: newClients, tokens: newTokens };
    }),
}));
