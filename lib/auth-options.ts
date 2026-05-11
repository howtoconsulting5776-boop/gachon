import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "이메일", type: "email" },
        password: { label: "비밀번호", type: "password" },
      },
      authorize(credentials) {
        const email = process.env.ADMIN_EMAIL?.trim();
        const password = process.env.ADMIN_PASSWORD;
        if (!email || password === undefined || password === "") {
          return null;
        }
        if (!credentials?.email || !credentials?.password) return null;
        if (credentials.email !== email || credentials.password !== password) {
          return null;
        }
        return {
          id: email,
          email,
          name: "Administrator",
          role: "admin",
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 12,
  },
  callbacks: {
    jwt({ token, user }) {
      if (user?.role) {
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string | undefined;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
