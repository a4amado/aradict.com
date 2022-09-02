import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";
import prisma from "../../../DB";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId:
        "314617600738-hatbt1hg1d3t4cgr2dfb0qhdjrovql5v.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
  // adapter: PrismaAdapter(prisma),
  callbacks: {
    async jwt({ token }) {
      // const user = await prisma.user.findUnique({
      //   select: {
      //     role: true
      //   }, where: {
      //     email: token.email
      //   }
      // });
      // console.log(user);
      
      token.rank = 0;
      token.role = "admin";

      return token;
    },
  },
  useSecureCookies: process.env.NODE_ENV === "production", 
  
};

export default NextAuth(authOptions);
