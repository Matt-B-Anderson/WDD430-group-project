import { Request, Response } from "express";
import sql from "../db";


export async function getAllProducts(req: Request, res: Response) {
    try {
        const { seller_id } = req.query;

        let products;

        if (seller_id) {
            products = await sql`
                SELECT p.*, s.name AS seller_name
                FROM products p
                LEFT JOIN sellers s ON p.seller_id = s.id
                WHERE p.seller_id = ${seller_id as string}
                ORDER BY p.created_at DESC
            `;
        } else {
            products = await sql`
                SELECT p.*, s.name AS seller_name
                FROM products p
                LEFT JOIN sellers s ON p.seller_id = s.id
                ORDER BY p.created_at DESC
            `;
        }

        res.json(products);
    } catch (error: any) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: error.message });
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
        const { title, price, description, image_url, seller_id, category } = req.body;

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
        const { title, price, description, image_url, seller_id, category } = req.body;

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
            return res.status(403).json({ error: "Not authorized to edit this product" });

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
            return res.status(403).json({ error: "Not authorized to delete this product" });

        await sql`
            DELETE FROM products WHERE id = ${id as string}
        `;

        res.json({ success: true });
    } catch (error: any) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error: error.message });
    }
}
