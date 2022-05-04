import NextAuth from "next-auth";
import { prisma } from "../prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { credentialsProvider } from "./providers/credetials";
import { githubProvider } from "./providers/github";
import { googleProvider } from "./providers/google";
import { credentialsRegisterProvider } from "./providers/register";


export const nextAuthHandler = NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [
		githubProvider,
		credentialsProvider,
		credentialsRegisterProvider,
		googleProvider,
	],
	session: {
		strategy: "jwt"
	},
	pages: {
		signIn: "/login",
	},
});
