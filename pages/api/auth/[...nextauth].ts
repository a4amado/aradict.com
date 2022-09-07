import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prisma from "../../../DB";

import type { NextAuthOptions } from "next-auth";

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
    const User = await pA.getUserByEmail(credentials.email)
    console.log(User);
    return User;
  },
  type: "credentials",
});

export const authOptions: NextAuthOptions = {
  providers: [
    CP,
    GoogleProvider({
      clientId: process.env.GOOGLE_CLINT_ID,
      clientSecret: process.env.GOOGLE_CLINT_SECRET,
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
        return false;
      }
    },
    async jwt({ token, user }) {
      token.role = user?.role;
      token.rank = user?.rank;
      return token;
    },
    async session({ token, user, session }) {
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
    strategy: "jwt"
  }
};

export default NextAuth(authOptions);
