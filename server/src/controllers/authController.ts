import sql from "../db";
import bcrypt from "bcrypt";
import { Request, Response } from "express";

export async function loginUser(req: Request, res: Response) {
	const { email, password } = req.body;

	try {
		const users = await sql`
      SELECT id, name, email, password, role, seller_id
      FROM users
      WHERE LOWER(email) = LOWER(${email})
      LIMIT 1
    `;

		if (users.length === 0) {
			return res.status(401).json({ error: "Invalid credentials" });
		}

		const user = users[0];
		const valid = await bcrypt.compare(password, user?.password);

		if (!valid) {
			return res.status(401).json({ error: "Invalid credentials" });
		}

		return res.json({
			id: user?.id,
			name: user?.name,
			email: user?.email,
			role: user?.role,
			seller_id: user?.seller_id,
		});
	} catch (error) {
		console.error("Login error:", error);
		res.status(500).json({ error: "Login failed" });
	}
}
