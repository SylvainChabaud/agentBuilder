import { getServerSession } from 'next-auth';
import { authOptions } from './authOptions';
// import fs from 'fs/promises'; // décommente si tu veux vérifier dans le fichier

/**
 * Auth middleware pour protéger tes routes API.
 * Exécute `callback(userId)` si l'utilisateur est authentifié.
 * Sinon, retourne une réponse 401 ou 403.
 */
export const withAuth = async (request, callback) => {
  console.info('🔐 withAuth', request);

  const session = await getServerSession({ req: request, ...authOptions });

  console.info('🔐 session', session);

  if (!session || !session.user?.id) {
    return new Response(JSON.stringify({ error: 'Non autorisé' }), {
      status: 401,
    });
  }

  const userId = session.user.id;
  console.info('userId', { userId, session, user: session.user });
  // Appelle la fonction métier en lui passant l'userId
  return callback(userId);
};
