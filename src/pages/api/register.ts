import type { NextApiRequest, NextApiResponse } from "next";
import { hashPassword } from "../../lib/auth/password";
import { prisma } from "../../lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "POST") {
		res.status(405).end();
		return;
	}
	if (typeof req.body !== "string") {
		res.status(400).end();
		return;
	}
	const { email, password, name }: {email?: string, password?: string, name?: string} = JSON.parse(req.body);
	if (!email || !password || !name) {
		res.status(400).end();
		return;
	}
	
	if (await prisma.user.findFirst({where: {email}})) {
		res.status(404).end();
		return;
	}

	//TODO validation

	await prisma.user.create({
		data: {
			email,
			password: await hashPassword(password),
			name,
		},
	});
	
	res.status(200).end();
};

export default handler;
