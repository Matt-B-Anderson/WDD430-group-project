import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ReviewForm from "@/app/components/ReviewForm";

async function getProduct(id: string) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
        { cache: "no-store" }
    );

    if (!res.ok) throw new Error("Failed to fetch product");
    return res.json();
}

async function getReviews(id: string) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/reviews/${id}`,
        { cache: "no-store" }
    );

    if (!res.ok) return [];
    return res.json();
}

export default async function ProductDetailPage({
    params,
}: {
    params: { id: string };
}) {
    const { id } = await params;

    const session = await getServerSession(authOptions);

    const p = await getProduct(id);
    const reviews = await getReviews(id);

    return (
        <div className="max-w-6xl mx-auto px-6 mt-16">
            {/* Back Link */}
            <a
                href="/products"
                className="text-[var(--accent)] font-semibold hover:underline"
            >
                ← Back to Products
            </a>

            {/* Product Section */}
            <div className="mt-10 grid md:grid-cols-2 gap-12">
                <img
                    src={p.image_url}
                    alt={p.name}
                    className="w-full rounded-xl shadow-lg"
                />

                <div>
                    <h1 className="text-4xl font-serif font-bold">{p.name}</h1>

                    <span className="inline-block mt-3 text-sm px-3 py-1 rounded-full bg-[var(--border)] text-[var(--foreground)]">
                        {p.category}
                    </span>

                    <p className="text-[var(--accent)] text-3xl font-bold mt-6">
                        ${p.price}
                    </p>

                    <p className="mt-8 text-lg leading-relaxed text-[var(--foreground)]/80">
                        {p.description}
                    </p>

                    <p className="text-[var(--foreground)]/60 mt-4">
                        by{" "}
                        <Link
                            href={`/sellers/${p.seller_id}`}
                            className="underline hover:text-[var(--accent)]"
                        >
                            {p.seller_name}
                        </Link>
                    </p>
                </div>
            </div>

            <div className="mt-16 border-t border-[var(--border)] pt-12">
                <h2 className="text-3xl font-serif font-bold mb-6">
                    Customer Reviews
                </h2>

                {reviews.length > 0 ? (
                    <></>
                ) : (
                    <p className="text-[var(--foreground)]/60 mb-6">
                        No reviews yet. Be the first!
                    </p>
                )}

                <div className="space-y-6">
                    {reviews.map((r: any) => (
                        <div
                            key={r.id}
                            className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-5 shadow-sm"
                        >
                            <p className="font-semibold text-[var(--accent)]">
                                {"⭐".repeat(r.rating)}
                            </p>

                            <p className="mt-2 text-[var(--foreground)]/90">
                                {r.review}
                            </p>

                            <p className="mt-1 text-sm text-[var(--foreground)]/50">
                                — {r.user_name ?? "Anonymous"}
                            </p>
                        </div>
                    ))}
                </div>

                {session?.user ? (
                    <ReviewForm productId={id} />
                ) : (
                    <p className="mt-10 text-[var(--foreground)]/60">
                        <a href="/login" className="underline text-[var(--accent)]">
                            Log in
                        </a>{" "}
                        to leave a review.
                    </p>
                )}
            </div>
        </div>
    );
}
