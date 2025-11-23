import sql from "../db";

export async function getAllProducts(req: any, res: any) {
	try {
		const products = await sql`
      SELECT 
        p.id, p.name, p.description, p.price, 
        p.category, p.image_url, p.created_at,
        s.name AS seller_name
      FROM products p
      LEFT JOIN sellers s ON s.id = p.seller_id
      ORDER BY p.created_at DESC
    `;

		res.json(products);
	} catch (err) {
		console.error("Error fetching products:", err);
		res.status(500).json({ error: "Failed to fetch products" });
	}
}
