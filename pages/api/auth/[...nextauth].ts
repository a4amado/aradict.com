import NextAuth, { Account, Profile } from "next-auth";
import CredentialsProvider, { CredentialsConfig } from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../DB";
import type { NextAuthOptions } from "next-auth";


const pA = PrismaAdapter(prisma);

const CredentialsProviderProps:CredentialsConfig  = {
  name: "Username and password",
  credentials: {
    email: {
      label: "Username or Email",
      type: "email",
      value: "",
      placeholder: "Username or Email Adress",
    },
    password: {
      label: "Password",
      type: "password",
      value: "",
      placeholder: "password",
    },
  },
  authorize: async (credentials, req) =>  {
    const User = await pA.getUserByEmail(credentials["email"]);

    

    return User;
  },
  type: "credentials",
  id: "credentials"
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider(CredentialsProviderProps),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET
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

