import { Request, Response } from "express";
import sql from "../db";

export async function getAllSellers(req: Request, res: Response) {
	try {
		const sellers = await sql`
      SELECT 
        id, 
        name, 
        bio, 
        profile_image
      FROM sellers
      ORDER BY name ASC
    `;
		return res.json(sellers);
	} catch (err) {
		console.error("Error fetching sellers:", err);
		return res.status(500).json({ error: "Failed to fetch sellers" });
	}
}

export async function getSellerById(req: Request, res: Response) {
	const { id } = req.params;

	try {
		const result = await sql`
      SELECT
        id,
        name,
        bio,
        profile_image
      FROM sellers
      WHERE id = ${id as string}
      LIMIT 1
    `;

		if (result.length === 0) {
			return res.status(404).json({ error: "Seller not found" });
		}

		return res.json(result[0]);
	} catch (err) {
		console.error("Error fetching seller by id:", err);
		return res.status(500).json({ error: "Failed to fetch seller" });
	}
}

export async function getSellerDashboard(req: Request, res: Response) {
	const { id } = req.params;

	try {
		const seller = await sql`
      SELECT id, name, bio, profile_image
      FROM sellers
      WHERE id = ${id as string}
      LIMIT 1
    `;

		if (seller.length === 0) {
			return res.status(404).json({ error: "Seller not found" });
		}

		const products = await sql`
      SELECT 
        id,
        title,
        description,
        price,
        image_url,
        category
      FROM products
      WHERE seller_id = ${id as string}
      ORDER BY title ASC
    `;

		return res.json({
			seller: seller[0],
			products,
		});
	} catch (err) {
		console.error("Dashboard error:", err);
		return res.status(500).json({ error: "Failed to load dashboard" });
	}
}
