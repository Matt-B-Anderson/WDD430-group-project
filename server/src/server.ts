import dotenv from "dotenv";
dotenv.config();

import express from "express";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import sql from "./db";
import productsRoute from "./routes/products";
import sellersRoute from "./routes/sellers";

const app = express();
app.use(express.json());

// routes
app.use("/products", productsRoute);
app.use("/sellers", sellersRoute);

// test route
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

// LOCAL DEVELOPMENT (if not running on Vercel)
if (!process.env.VERCEL) {
	const PORT = process.env.PORT || 3001;
	app.listen(PORT, () => {
		console.log(`Local server running on http://localhost:${PORT}`);
	});
}

// VERCEL HANDLER
export default function handler(req: VercelRequest, res: VercelResponse) {
	return app(req as any, res as any);
}
