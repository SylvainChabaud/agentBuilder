import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { verifyUser } from '../../../../lib/usersManager/verifyUser';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Identifiants',
      credentials: {
        username: { label: 'Nom d’utilisateur', type: 'text' },
        password: { label: 'Mot de passe', type: 'password' },
      },
      async authorize(credentials) {
        // Vérifier l'utilisateur avec les identifiants
        const user = await verifyUser(
          credentials.username,
          credentials.password
        );
        if (user) {
          console.info('authorize', user);

          // Retourner l'objet utilisateur avec les informations nécessaires
          return {
            id: user.id, // ID unique transmis au token
            name: user.username, // Nom de l'utilisateur (affiché dans session.user.name)
            permission: user.permission, // Permission de l'utilisateur
          };
        }
        return null; // Si l'utilisateur n'est pas trouvé, retourner null
      },
    }),
  ],
  session: { strategy: 'jwt' },
  jwt: { secret: process.env.NEXTAUTH_SECRET },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.info('jwt callback', user); // Affiche les informations de l'utilisateur
        token.id = user.id; // Ajoute l'ID de l'utilisateur au token
        token.name = user.name; // Ajoute le nom de l'utilisateur au token
        // @ts-ignore
        token.permission = user.permission; // Ajoute la permission au token
      }
      return token; // Retourner le token enrichi
    },
    async session({ session, token }) {
      console.info('session callback', token); // Affiche le token avec l'ID et le nom
      // @ts-ignore
      session.user.id = token.id; // Ajoute l'ID de l'utilisateur à session.user
      session.user.name = token.name; // Ajoute le nom de l'utilisateur à session.user
      // @ts-ignore
      session.user.permission = token.permission; // Ajoute la permission à session.user
      return session; // Retourner la session enrichie
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      if (url.startsWith(baseUrl)) return url;
      return baseUrl;
    },
  },
};
