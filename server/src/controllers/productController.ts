import { Request, Response } from "express";
import sql from "../db";

export async function getFilteredProducts(req: Request, res: Response) {
	try {
		// Extract & validate query params
		const category =
			typeof req.query.category === "string" ? req.query.category : undefined;

		const min =
			typeof req.query.min === "string" ? Number(req.query.min) : undefined;

		const max =
			typeof req.query.max === "string" ? Number(req.query.max) : undefined;

		const search =
			typeof req.query.search === "string" ? req.query.search : undefined;

		// Base WHERE fragment
		let where = sql`WHERE 1=1`;

		if (category) {
			where = sql`${where} AND p.category = ${category}`;
		}

		if (min !== undefined) {
			where = sql`${where} AND p.price >= ${min}`;
		}

		if (max !== undefined) {
			where = sql`${where} AND p.price <= ${max}`;
		}

		if (search) {
			const term = `%${search}%`;
			where = sql`${where} AND (p.title ILIKE ${term} OR p.description ILIKE ${term})`;
		}

		const products = await sql`
      SELECT 
        p.id,
        p.title,
        p.description,
        p.price,
        p.image_url,
        p.category,
        p.created_at,
        s.name AS seller_name,

        -- average rating
        COALESCE((
          SELECT AVG(r.rating)::numeric(10,2)
          FROM reviews r
          WHERE r.product_id = p.id
        ), 0) AS avg_rating,

        -- number of reviews
        (
          SELECT COUNT(*)
          FROM reviews r
          WHERE r.product_id = p.id
        ) AS review_count

      FROM products p
      LEFT JOIN sellers s ON p.seller_id = s.id
      ${where}
      ORDER BY p.created_at DESC
    `;

		res.json(products);
	} catch (error) {
		console.error("Product filter error:", error);
		res.status(500).json({ error: "Failed to retrieve products" });
	}
}

export async function getProductById(req: Request, res: Response) {
	try {
		const { id } = req.params;

		const product = await sql`
            SELECT p.*, s.name AS seller_name
            FROM products p
            LEFT JOIN sellers s ON p.seller_id = s.id
            WHERE p.id = ${id as string}
        `;

		if (product.length === 0)
			return res.status(404).json({ error: "Product not found" });

		res.json(product[0]);
	} catch (error: any) {
		console.error("Error fetching product:", error);
		res.status(500).json({ error: error.message });
	}
}

export async function createProduct(req: Request, res: Response) {
	try {
		const { title, price, description, image_url, seller_id, category } =
			req.body;

		if (!seller_id)
			return res.status(400).json({ error: "seller_id required" });

		const result = await sql`
            INSERT INTO products (title, price, description, image_url, seller_id, category)
            VALUES (${title}, ${price}, ${description}, ${image_url}, ${seller_id}, ${category})
            RETURNING *
        `;

		res.status(201).json(result[0]);
	} catch (error: any) {
		console.error("Error creating product:", error);
		res.status(500).json({ error: error.message });
	}
}

export async function updateProduct(req: Request, res: Response) {
	try {
		const { id } = req.params;
		const { title, price, description, image_url, seller_id, category } =
			req.body;

		if (!seller_id)
			return res.status(400).json({ error: "seller_id is required" });

		// Fetch product
		const product = await sql`
            SELECT * FROM products WHERE id = ${id as string}
        `;

		if (product.length === 0)
			return res.status(404).json({ error: "Product not found" });

		// Verify seller owns product
		if (product[0]?.seller_id !== seller_id)
			return res
				.status(403)
				.json({ error: "Not authorized to edit this product" });

		const updated = await sql`
            UPDATE products SET
                title = ${title},
                price = ${price},
                description = ${description},
                image_url = ${image_url},
                category = ${category}
            WHERE id = ${id as string}
            RETURNING *
        `;

		res.json(updated[0]);
	} catch (err: any) {
		console.error("Error updating product:", err);
		res.status(500).json({ error: err.message });
	}
}

export async function deleteProduct(req: Request, res: Response) {
	try {
		const { id } = req.params;
		const { seller_id } = req.body;

		// verify product belongs to seller
		const existing = await sql`
            SELECT * FROM products WHERE id = ${id as string}
        `;

		if (existing.length === 0)
			return res.status(404).json({ error: "Product not found" });

		if (existing[0]?.seller_id !== seller_id)
			return res
				.status(403)
				.json({ error: "Not authorized to delete this product" });

		await sql`
            DELETE FROM products WHERE id = ${id as string}
        `;

		res.json({ success: true });
	} catch (error: any) {
		console.error("Error deleting product:", error);
		res.status(500).json({ error: error.message });
	}
}
