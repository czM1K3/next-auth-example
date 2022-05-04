import type { GetServerSideProps, NextPage } from "next"
import { BuiltInProviderType } from "next-auth/providers";
import { ClientSafeProvider, getCsrfToken, getProviders, getSession, LiteralUnion, signIn, useSession } from "next-auth/react"
import Link from "next/link";
import { useState } from "react";
import { getErrorMessage } from "../lib/auth/errorMessage";

type LoginProps = {
	providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null;
	csrfToken: string;
	error: string | null;
};

const Login: NextPage<LoginProps> = ({ providers, csrfToken, error }) => {
	const [showLogin, setShowLogin] = useState(true);
	return (
		<>
			<Link href="/" passHref>
				<a>
					<button>Back</button>
				</a>
			</Link>
			<a onClick={(e) => {
				e.preventDefault();
				setShowLogin(!showLogin);
			}}>
				<button>Register</button>
			</a>
			{Object.values(providers ?? []).filter((provider) => provider.name !== "Credentials").map((provider) => (
				<div key={provider.name}>
					<button onClick={() => signIn(provider.id)}>
						Sign in with {provider.name}
					</button>
				</div>
			))}
			{error && <p style={{color: "red"}}>{error}</p>}
			{showLogin ? (
				<form method="post" action="/api/auth/callback/credentials">
					<input name="csrfToken" type="hidden" defaultValue={csrfToken} />
					<input type="email" name="email" placeholder="Email" />
					<input type="password" name="password" placeholder="Password" />
					<button>Login</button>
				</form>
			) : (
				<form method="post" action="/api/auth/callback/credentials-register">
					<input name="csrfToken" type="hidden" defaultValue={csrfToken} />
					<input type="email" name="email" placeholder="Email" />
					<input type="password" name="password" placeholder="Password" />
					<input type="text" name="name" placeholder="Name" />
					<button>Register</button>
				</form>
			)}
		</>
	);
};

export const getServerSideProps: GetServerSideProps<LoginProps> = async (context) => {
	const session = await getSession(context);
	if (session)
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};

	return {
		props: {
			providers: await getProviders(),
			csrfToken: (await getCsrfToken(context))!,
			error: getErrorMessage(context.query.error),
		},
	};
}

export default Login;