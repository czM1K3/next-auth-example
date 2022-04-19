import NextAuth from "next-auth";
import { prisma } from "../prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { credentialsProvider } from "./providers/credetials";
import { githubProvider } from "./providers/github";


export const nextAuthHandler = NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [
		githubProvider,
		credentialsProvider,
	],
	session: {
		strategy: "jwt"
	},
});
