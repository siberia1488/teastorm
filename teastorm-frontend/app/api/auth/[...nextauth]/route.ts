import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),

  providers: [
    EmailProvider({
      server: {
        host: "localhost",
        port: 1025,
        auth: {
          user: "",
          pass: "",
        },
      },
      from: "no-reply@teastorm.local",
    }),
  ],

  pages: {
    signIn: "/api/auth/signin",
    verifyRequest: "/api/auth/verify-request",
  },

  session: {
    strategy: "database",
  },

  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },

  secret: "dev-secret-change-later",
});

export { handler as GET, handler as POST };
