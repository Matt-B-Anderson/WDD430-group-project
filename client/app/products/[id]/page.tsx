import Link from "next/link";

async function getProduct(id: string) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
        { cache: "no-store" }
    );

    if (!res.ok) throw new Error("Failed to fetch product");
    return res.json();
}

export default async function ProductDetailPage({
    params,
}: {
    params: { id: string };
}) {
    const product = await getProduct(params.id);

    return (
        <div className="max-w-6xl mx-auto px-6 mt-16">

            <Link
                href="/products"
                className="text-(--accent) font-semibold hover:underline"
            >
                ← Back to Products
            </Link>

            <div className="mt-10 grid md:grid-cols-2 gap-12">

                <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full rounded-xl shadow-lg"
                />

                <div>
                    <h1 className="text-4xl font-serif font-bold">{product.name}</h1>

                    <span className="inline-block mt-3 text-sm px-3 py-1 rounded-full bg-(--border) text-(--foreground)">
                        {product.category}
                    </span>

                    {/* Price */}
                    <p className="text-(--accent) text-3xl font-bold mt-6">
                        ${product.price}
                    </p>

                    <div className="mt-8 flex items-center gap-4">
                        <img
                            src={product.seller_image}
                            className="w-16 h-16 rounded-full object-cover border border-(--border)"
                        />
                        <div>
                            <p className="font-serif text-xl font-bold">{product.seller_name}</p>
                            <p className="text-(--foreground)/70">{product.seller_bio}</p>
                        </div>
                    </div>


                    <p className="mt-8 leading-relaxed text-(--foreground)/80 text-lg">
                        {product.description}
                    </p>

                    <button className="mt-10 w-full px-6 py-4 bg-(--accent) text-white rounded-lg text-lg font-semibold hover:opacity-90">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
