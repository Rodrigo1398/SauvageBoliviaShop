import NextAuth, { type NextAuthConfig } from "next-auth";
import authConfig from "./auth.config";

import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";

const nextAuthOptions: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  pages: { signIn: "/auth/login", signOut: "/" },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      return true;
    },

    jwt({ token, user }) {
      if (user) {
        token.data = user;
      }

      return token;
    },

    session({ session, token, user }) {
      session.user = token.data as any;
      return session;
    },
  },
  session: { strategy: "jwt" },
  ...authConfig,
};

export const { signIn, signOut, auth, handlers } = NextAuth(nextAuthOptions);
