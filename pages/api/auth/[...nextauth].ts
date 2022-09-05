import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prisma from "../../../DB";

import type { NextAuthOptions } from "next-auth";

function getUser() {}

const pA = PrismaAdapter(prisma);

const CP = CredentialsProvider({
  name: "Username and password",
  credentials: {
    email: {
      label: "Username or Email",
      type: "email",
      name: "email",
      placeholder: "Username or Email Adress",
    },
    password: {
      label: "Password",
      type: "password",
      placeholder: "password",
    },
  },
  authorize: async (credentials, req) => {
    const User = await prisma.user.findFirst({
      where: {
        OR: [
          {
            email: credentials.email,
          },
          {
            username: credentials.email,
          },
        ],
      },
      select: {
        email: true,
        hash: true,
        image: true, 
        name: true
      }
    });
    console.log(User);
    return User;
  },
  type: "credentials",
});

export const authOptions: NextAuthOptions = {
  providers: [
    CP,
    GoogleProvider({
      clientId:
        "314617600738-hatbt1hg1d3t4cgr2dfb0qhdjrovql5v.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
  adapter: pA,
  callbacks: {
    async signIn({ account, email, user, profile, credentials }) {
      try {
        const isExist = await pA.getUserByEmail(user.email);
        if (isExist) return true;
        const nAg = await pA.createUser({
          email: profile.email,
          image: profile.picture,
          username: profile.email.split("@")[0].toString(),
          name: profile.given_name + " " + profile.family_name,
          role: "soundContributer",
          locale: "en-US",
        });

        account.userId = nAg.id;
        await pA.linkAccount(account);
        return true;
      } catch (error) {
        console.log(error);

        return false;
      }
    },
    async jwt({ token, user }) {
      token.rank = user?.rank || 0;
      token.role = user?.role || "admin";
      return token;
    },
    async session({ token, user, session }) {
      session.rank = token?.rank || 0;
      session.role = token?.role || "admin";
      return session;
    },
  },
  session: {
    strategy: "database",
  },
};

export default NextAuth(authOptions);
