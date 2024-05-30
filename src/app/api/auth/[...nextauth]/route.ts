import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "test@test.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const { data: user } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
            email: credentials?.email,
            password: credentials?.password,
          });

          if (user.error) {
            throw new Error(user.error);
          }

          return user;
        } catch (error) {
          console.error("Error de autenticación:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user as {
          email: string;
          data: {
            token: string;
            firstName: string;
            lastName: string;
            id: number;
          };
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
});

export { handler as GET, handler as POST };
