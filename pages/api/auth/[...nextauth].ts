import { signIn } from 'next-auth/react';
import NextAuth, { Account, Profile } from "next-auth";
import CredentialsProvider, { CredentialsConfig } from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prisma from "../../../DB";

import type { NextAuthOptions } from "next-auth";
import { userAgent } from 'next/server';

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
    GoogleProvider({
      clientId: process.env.GOOGLE_CLINT_ID,
      clientSecret: process.env.GOOGLE_CLINT_SECRET,
      
    }),
  ],
  adapter: pA,
  
  callbacks: {
    async session({ user, session }) {
      session.role = user?.role;
      session.rank = user?.rank;
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
  }
};

export default NextAuth(authOptions);

