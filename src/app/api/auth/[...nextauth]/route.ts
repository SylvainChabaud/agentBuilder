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
    secret: process.env.JWT_SECRET,
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
  },
});

export { handler as GET, handler as POST };
