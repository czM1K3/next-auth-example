import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../../prisma";
import { validatePassword } from "../password";

export const credentialsProvider = CredentialsProvider({
	name: "Credentials",
	credentials: {
		email: { label: "Email", type: "text", placeholder: "jsmith" },
		password: { label: "Password", type: "password" },
	},
	async authorize(credentials, _req) {
		if (!credentials?.email || !credentials.password)
			return null;
		const user = await prisma.user.findFirst({
			where: { email: credentials.email },
		});
		if (!user || !user.password)
			return null;
		const passwordMatch = await validatePassword(credentials.password, user.password);
		return passwordMatch ? user : null;
	},
});
