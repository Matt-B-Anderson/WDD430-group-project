import sql from "../db";

export async function getAllProducts(req: any, res: any) {
	try {
		const products = await sql`
      SELECT 
        p.id, p.title, p.description, p.price, 
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

export async function getProductById(req: any, res: any) {
	const { id } = req.params;

	try {
		const product = await sql`
      SELECT 
        p.*, 
        s.name AS seller_name,
        s.bio AS seller_bio,
        s.profile_image AS seller_image
      FROM products p
      LEFT JOIN sellers s ON s.id = p.seller_id
      WHERE p.id = ${id}
      LIMIT 1
    `;

		if (product.length === 0) {
			return res.status(404).json({ error: "Product not found" });
		}

		res.json(product[0]);
	} catch (err) {
		console.error(`Error fetching product with id: ${id}}:`, err);
		res.status(500).json({ error: `Failed to fetch product with id: ${id}` });
	}
}
