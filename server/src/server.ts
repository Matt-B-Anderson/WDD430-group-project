import dotenv from "dotenv";
dotenv.config();

import express from "express";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import sql from "./db";
import productsRoute from "./routes/products";

const app = express();
app.use(express.json());

app.use("/products", productsRoute);
app.get("/test-db", async (req, res) => {
	try {
		const result: any = await sql`SELECT NOW()`;
		res.json({
			message: "Database connection successful!",
			time: result[0].now,
		});
	} catch (err: any) {
		res.status(500).json({
			message: "Database connection failed",
			error: err.message,
		});
	}
});

if (process.env.ENV === "local") {
	const PORT = process.env.PORT || 3000;
	app.listen(PORT, () => {
		console.log(`Local server running on http://localhost:${PORT}`);
	});
}


export default function handler(req: VercelRequest, res: VercelResponse) {
	return app(req as any, res as any);
}
