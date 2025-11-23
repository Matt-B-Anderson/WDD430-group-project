import Link from "next/link";

async function getProducts() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products`,
        { cache: "no-store" }
    );

    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
}

export default async function ProductsPage() {
    const products = await getProducts();

    return (
        <div className="max-w-7xl mx-auto px-6 mt-16">
            <h1 className="text-4xl font-serif font-bold mb-10">Products</h1>

            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">

                {products.map((p: any) => (
                    <Link
                        href={`/products/${p.id}`}
                        key={p.id}
                        className="bg-\[var\(--background\)\] border border-\[var\(--border\)\] rounded-xl shadow-sm hover:shadow-md transition block"
                    >
                        <img
                            src={p.image_url}
                            alt={p.name}
                            className="w-full h-48 object-cover rounded-t-xl"
                        />

                        <div className="p-4">
                            <h4 className="text-xl font-serif font-bold">{p.name}</h4>

                            <span className="inline-block mt-2 text-sm px-3 py-1 rounded-full bg-\[var\(--border\)\] text-\[var\(--foreground\)\]">
                                {p.category}
                            </span>

                            <p className="text-\[var\(--accent\)\] font-semibold mt-3">
                                ${p.price}
                            </p>

                            <p className="text-\[var\(--foreground\)\]/70 mt-1">
                                {p.seller_name ? `By ${p.seller_name}` : "By Unknown Artisan"}
                            </p>
                        </div>
                    </Link>
                ))}

            </div>
        </div>
    );
}
