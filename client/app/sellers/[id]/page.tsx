import Image from "next/image";

async function getSeller(id: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sellers/${id}`, {
        cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch seller");
    return res.json();
}

async function getSellerProducts(id: string) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products?seller_id=${id}`,
        { cache: "no-store" }
    );
    if (!res.ok) throw new Error("Failed to fetch seller products");
    return res.json();
}

export default async function SellerProfilePage({
    params,
}: {
    params: { id: string };
}) {
    const sellerId = (await params).id;

    const seller = await getSeller(sellerId);
    const products = await getSellerProducts(sellerId);

    return (
        <main className="max-w-7xl mx-auto px-6 py-12 text-\[var\(--foreground\)\]">

            {/* SELLER HEADER */}
            <section className="flex flex-col md:flex-row items-center gap-10 bg-\[var\(--card\)\] border border-\[var\(--border\)\] p-8 rounded-2xl shadow-sm">

                {/* Profile Image */}
                <div className="w-40 h-40 rounded-full overflow-hidden shadow-md border border-\[var\(--border\)\]">
                    <Image
                        src={seller.profile_image}
                        alt={seller.name}
                        width={200}
                        height={200}
                        className="object-cover w-full h-full"
                    />
                </div>

                {/* Info */}
                <div className="flex-1">
                    <h1 className="text-4xl font-serif font-bold">{seller.name}</h1>

                    <p className="mt-4 text-lg text-\[var\(--foreground\)\]/70 leading-relaxed">
                        {seller.bio}
                    </p>
                </div>
            </section>

            {/* SELLER PRODUCTS */}
            <section className="mt-16">
                <h2 className="text-3xl font-serif font-bold">
                    Products by {seller.name}
                </h2>

                {/* Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
                    {products.map((product: any) => (
                        <a
                            key={product.id}
                            href={`/products/${product.id}`}
                            className="bg-\[var\(--card\)\] border border-\[var\(--border\)\] rounded-xl shadow-sm hover:shadow-md transition block"
                        >
                            <Image
                                src={product.image_url}
                                alt={product.title}
                                width={500}
                                height={400}
                                className="w-full h-56 object-cover rounded-t-xl"
                            />

                            <div className="p-4">
                                <h3 className="text-xl font-serif font-bold">{product.title}</h3>

                                <p className="text-\[var\(--accent\)\] font-semibold mt-1">
                                    ${product.price}
                                </p>

                                <p className="text-\[var\(--foreground\)\]/60 mt-1">
                                    {product.category}
                                </p>
                            </div>
                        </a>
                    ))}
                </div>

                {products.length === 0 && (
                    <p className="text-center text-\[var\(--foreground\)\]/60 mt-10">
                        This seller has no products listed yet.
                    </p>
                )}
            </section>

        </main>
    );
}
