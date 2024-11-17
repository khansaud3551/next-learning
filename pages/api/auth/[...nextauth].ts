import { NextApiHandler } from "next";
import NextAuth, { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GitHubProvider from "next-auth/providers/github";
import prisma from "../../../lib/prisma";

// Define the authentication options for NextAuth
export const authOptions: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET, // Use NEXTAUTH_SECRET for consistency with NextAuth v4 conventions

  callbacks: {
    async session({ session, user, token }) {
      // Customize the session object here
      session.user.id = user.id;
      return session;
    },
  },
};

// Define the API route handler for NextAuth
const authHandler: NextApiHandler = (req, res) =>
  NextAuth(req, res, authOptions);
export default authHandler;
