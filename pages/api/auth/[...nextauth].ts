import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId:
        "314617600738-hatbt1hg1d3t4cgr2dfb0qhdjrovql5v.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
});
