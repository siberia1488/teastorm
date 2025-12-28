import { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
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

  session: {
    strategy: "database",
  },

  pages: {
    signIn: "/login",
  },

  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
