import sql from "../db";
import { Request, Response } from "express";

export async function addReview(req: Request, res: Response) {
    const { product_id, user_id, rating, review } = req.body;

    try {
        if (!product_id || !user_id || !rating) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const existing = await sql`
            SELECT * FROM reviews 
            WHERE product_id = ${product_id} AND user_id = ${user_id}
            LIMIT 1;
        `;

        if (existing.length > 0) {
            return res.status(400).json({ error: "User already reviewed this product" });
        }

        const result = await sql`
            INSERT INTO reviews (product_id, user_id, rating, review)
            VALUES (${product_id}, ${user_id}, ${rating}, ${review})
            RETURNING *;
        `;

        res.json(result[0]);

    } catch (error) {
        console.error("Add review error:", error);
        res.status(500).json({ error: "Failed to add review" });
    }
}


export async function getReviewsByProduct(req: Request, res: Response) {
    
    const { id: product_id } = req.params;
    console.log("Fetching product for id" + product_id);
    try {
        const reviews = await sql`
            SELECT r.*, u.name AS user_name
            FROM reviews r
            JOIN users u ON r.user_id = u.id
            WHERE r.product_id = ${product_id as string}
            ORDER BY r.created_at DESC;
        `;

        res.json(reviews);

    } catch (error) {
        console.error("Get reviews error:", error);
        res.status(500).json({ error: "Failed to fetch reviews" });
    }
}
