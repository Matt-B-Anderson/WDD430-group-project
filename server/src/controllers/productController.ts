import { Request, Response } from "express";
import sql from "../db";

// GET /products?seller_id=optional
export async function getAllProducts(req: Request, res: Response) {
	const { seller_id } = req.query;

	try {
		let products;

		if (seller_id) {
			// Filter by seller_id
			products = await sql`
        SELECT 
          p.id,
          p.title,
          p.description,
          p.price,
          p.image_url,
          p.category,
          p.seller_id,
          s.name AS seller_name
        FROM products p
        LEFT JOIN sellers s ON s.id = p.seller_id
        WHERE p.seller_id = ${seller_id as string}
        ORDER BY p.created_at DESC NULLS LAST, p.title ASC
      `;
		} else {
			// All products
			products = await sql`
        SELECT 
          p.id,
          p.title,
          p.description,
          p.price,
          p.image_url,
          p.category,
          p.seller_id,
          s.name AS seller_name
        FROM products p
        LEFT JOIN sellers s ON s.id = p.seller_id
        ORDER BY p.created_at DESC NULLS LAST, p.title ASC
      `;
		}

		return res.json(products);
	} catch (err) {
		console.error("Error fetching products:", err);
		return res.status(500).json({ error: "Failed to fetch products" });
	}
}

export async function getProductById(req: Request, res: Response) {
	const { id } = req.params;

	try {
		const result = await sql`
      SELECT
        p.id,
        p.title,
        p.description,
        p.price,
        p.image_url,
        p.category,
        p.seller_id,
        s.name AS seller_name,
        s.bio AS seller_bio,
        s.profile_image AS seller_image
      FROM products p
      LEFT JOIN sellers s ON s.id = p.seller_id
      WHERE p.id = ${id as string}
      LIMIT 1
    `;

		if (result.length === 0) {
			return res.status(404).json({ error: "Product not found" });
		}

		return res.json(result[0]);
	} catch (err) {
		console.error("Error fetching product by id:", err);
		return res.status(500).json({ error: "Failed to fetch product" });
	}
}
