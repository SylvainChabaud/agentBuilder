import NextAuth from 'next-auth';
import { verifyUser } from '../../../../../lib/usersManager/verifyUser';

const CredentialsProvider = require('next-auth/providers/credentials').default;

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Identifiants',
      credentials: {
        username: { label: 'Nom d’utilisateur', type: 'text' },
        password: { label: 'Mot de passe', type: 'password' },
      },
      async authorize(credentials) {
        console.log('🔍 credentials :', credentials);
        const isValid = await verifyUser(
          credentials.username,
          credentials.password
        );
        console.log('🔍 isValid :', isValid);
        if (isValid) {
          return { id: credentials.username, name: credentials.username };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
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
      console.log('🔁 redirect callback:', { url, baseUrl });
      // Si url commence par /, on la considère comme locale
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // Si url commence par baseUrl, c’est bon
      if (url.startsWith(baseUrl)) return url;
      // Sinon, fallback sur baseUrl (production)
      return baseUrl;
    },
  },
});

export { handler as GET, handler as POST };
