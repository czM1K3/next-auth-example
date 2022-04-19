import CredentialsProvider from "next-auth/providers/credentials";

export const credentialsProvider = CredentialsProvider({
	name: "Credentials",
	credentials: {
		username: { label: "Username", type: "text", placeholder: "jsmith" },
		password: { label: "Password", type: "password" },
	},
	async authorize(credentials, req) {
		return null;
	},
});
