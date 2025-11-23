async function getProducts() {
    const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/products",
        { cache: "no-store" }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }

    return res.json();
}

export default async function ProductsPage() {
    const products = await getProducts();

    return (
        <div className="max-w-7xl mx-auto mt-16 px-6">
            <h1 className="text-4xl font-serif font-bold mb-10">Products</h1>

            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products.map((p: any) => (
                    <div
                        key={p.id}
                        className="bg-[#F5EDE0] border border-[#E0D6CF] rounded-xl shadow-sm hover:shadow-md transition"
                    >
                        <img
                            className="w-full h-48 object-cover rounded-t-xl"
                            src={p.image_url}
                            alt={p.name}
                        />
                        <div className="p-4">
                            <h4 className="text-xl font-serif font-bold">{p.name}</h4>

                            {/* CATEGORY BADGE */}
                            <span className="inline-block mt-2 text-sm px-3 py-1 rounded-full bg-[#E0D6CF] text-[#3A2E2A]">
                                {p.category}
                            </span>

                            <p className="text-[#D97C59] font-semibold mt-3">
                                ${p.price}
                            </p>

                            <p className="text-[#6E7F4E] mt-1">
                                {p.seller_name ? `By ${p.seller_name}` : "By Unknown Artisan"}
                            </p>

                            <p className="mt-2 text-[#D4A350]">★★★★☆</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}