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
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const p = await getProduct(id);

    return (
        <div className="max-w-6xl mx-auto px-6 mt-16">

            <a href="/products" className="text-\[var\(--accent\)\] font-semibold hover:underline">
                ← Back to Products
            </a>

            <div className="mt-10 grid md:grid-cols-2 gap-12">

                <img
                    src={p.image_url}
                    alt={p.name}
                    className="w-full rounded-xl shadow-lg"
                />

                <div>
                    <h1 className="text-4xl font-serif font-bold">{p.name}</h1>

                    <span className="inline-block mt-3 text-sm px-3 py-1 rounded-full bg-\[var\(--border\)\] text-\[var\(--foreground\)\]">
                        {p.category}
                    </span>

                    <p className="text-\[var\(--accent\)\] text-3xl font-bold mt-6">
                        ${p.price}
                    </p>

                    <p className="mt-8 text-lg leading-relaxed text-\[var\(--foreground\)\]/80">
                        {p.description}
                    </p>

                    <p className="text-[var(--foreground)]/60">
                        by <Link href={`/sellers/${p.seller_id}`} className="underline hover:text-[var(--accent)]">{p.seller_name}</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
