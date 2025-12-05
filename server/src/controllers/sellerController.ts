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
