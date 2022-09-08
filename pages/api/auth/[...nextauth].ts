import { signIn } from 'next-auth/react';
import NextAuth, { Account, Profile } from "next-auth";
import CredentialsProvider, { CredentialsConfig } from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

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
    GoogleProvider({
      clientId: process.env.GOOGLE_CLINT_ID,
      clientSecret: process.env.GOOGLE_CLINT_SECRET,
    }),
  ],
  adapter: pA,
  
  callbacks: {
    async signIn({ credentials, account, email, profile, user }) {
      try {
      
        

      
      const s = await pA.getUserByEmail(user.email);
      if(s) return true;
      
      const newUSer = await pA.createUser({
        email: profile.email,
          username: profile.email,
          role: "soundContributer"
      });
         
      await pA.linkAccount({...account, userId: newUSer.id })
      
      
      
      return true;
        
      } catch (error) {
        console.log(error);
        
        return false;
      }
      
      

    },
    async jwt({ token, user }) {
      token.role = user?.role;
      token.rank = user?.rank;
      return token;
    },
    async session({ token, user, session }) {
      session.role = token?.role;
      session.rank = token?.rank;
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
