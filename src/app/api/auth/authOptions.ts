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
        const user = await verifyUser(
          credentials.username,
          credentials.password
        );
        if (user) {
          return {
            id: user.id, // ✅ ID unique transmis au token
            name: user.username, // affiché dans session.user.name
          };
        }
        return null;
      },
    }),
  ],
  session: { strategy: 'jwt' },
  jwt: { secret: process.env.NEXTAUTH_SECRET },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      // @ts-ignore
      session.user.id = token.id;
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      if (url.startsWith(baseUrl)) return url;
      return baseUrl;
    },
  },
};
