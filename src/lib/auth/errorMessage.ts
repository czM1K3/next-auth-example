export const getErrorMessage = (error: string | string[] | undefined): string | null => {
	switch (error) {
		case "CredentialsSignin":
			return "Invalid email or password"
		default:
			return null;
	};
};
