import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios"; // Importa axios
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
          // Utiliza axios para hacer la solicitud POST
          const { data: user } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
            email: credentials?.email,
            password: credentials?.password,
          });

          if (user.error) {
            throw new Error(user.error);
          }

          // Si la autenticación es exitosa, retorna el objeto user
          return user;
        } catch (error) {
          // Maneja cualquier error que ocurra durante la solicitud
          console.error("Error de autenticación:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
