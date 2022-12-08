import NextAuth from "next-auth";

import DiscordProvider from "next-auth/providers/discord";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../DB";
import type { NextAuthOptions } from "next-auth";


const pA = PrismaAdapter(prisma);

export const authOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: "1021377999695781888",
      clientSecret: "Gp2aTmnNnB-UM7Be4uTB_5cUksUg3A3x"
    })
  ],
  adapter: pA,
  
  callbacks: {
    async session({ user, session }) {      
      session.role = user?.role;
      session.rank = user?.rank;
      session.id = user?.id;
      
      return session;
    }
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.JWT_SECRET,
  session: {
    strategy: "database",
    updateAge: 60 * 60 * 24,
    maxAge: (60 * 60 * 24) * 2
  },

  debug: true
};

export default NextAuth(authOptions);

