import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../../prisma";
import { hashPassword, validatePassword } from "../password";

export const credentialsRegisterProvider = CredentialsProvider({
	name: "Credentials Register",
	id: "credentials-register",
	credentials: {
		email: { label: "Email", type: "text", placeholder: "jsmith" },
		password: { label: "Password", type: "password" },
		name: { label: "Name", type: "text" },
	},
	async authorize(credentials, _req) {
		if (!credentials?.email || !credentials.password || !credentials.name)
			return null;
		
		if (await prisma.user.findFirst({where: {email: credentials.email}})) {
			return null;
		}
	
		//TODO validation
	
		return await prisma.user.create({
			data: {
				email: credentials.email,
				password: await hashPassword(credentials.password),
				name: credentials.name,
			},
		});
	},
});
