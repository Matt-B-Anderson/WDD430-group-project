import dotenv from "dotenv";
dotenv.config();

import express from "express";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import sql from "./db";
import productsRoute from "./routes/products";
import sellersRoute from "./routes/sellers";
import authRoute from "./routes/auth";
import reviewRoutes from "./routes/reviews";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    cors({
        origin: (origin, callback) => {
            const allowed = [
                "http://localhost:3000",
                process.env.NEXT_PUBLIC_CLIENT_URL,
            ];

            if (
                origin &&
                (allowed.includes(origin) ||
                    /\.vercel\.app$/.test(origin))
            ) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"), false);
            }
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);


// routes
app.use("/auth", authRoute);
app.use("/products", productsRoute);
app.use("/sellers", sellersRoute);
app.use("/reviews", reviewRoutes);

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
