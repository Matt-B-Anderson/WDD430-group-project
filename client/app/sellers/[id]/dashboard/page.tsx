"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

interface Seller {
    id: string;
    name: string;
    bio: string;
    profile_image: string;
}

interface Product {
    id: string;
    title: string;
    price: number;
    image_url: string;
}

export default function SellerDashboard({ params }: { params: { id: string } }) {
    const { data: session, status } = useSession();

    const [seller, setSeller] = useState<Seller | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    if (status === "loading") return <p>Loading session...</p>;

    if (!session?.user) return redirect("/login");

    if (session.user.role !== "seller") return redirect("/");

    if (session.user.seller_id !== params.id)
        return redirect(`/sellers/${session.user.seller_id}/dashboard`);

    useEffect(() => {
        async function loadData() {
            try {
                // Fetch seller
                const sellerRes = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/sellers/${params.id}`
                );
                const sellerData = await sellerRes.json();
                setSeller(sellerData);

                // Fetch products
                const prodRes = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/products?seller_id=${params.id}`
                );
                const prodData = await prodRes.json();
                setProducts(prodData);
            } catch (err) {
                console.error("Failed to load seller dashboard:", err);
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, [params.id]);


    if (loading) {
        return (
            <main className="max-w-7xl mx-auto px-6 py-12">
                <p className="text-[var(--foreground)]/70">Loading dashboard...</p>
            </main>
        );
    }

    if (!seller) {
        return (
            <main className="max-w-7xl mx-auto px-6 py-12">
                <p className="text-[var(--foreground)]">Seller not found.</p>
            </main>
        );
    }

    return (
        <main className="max-w-7xl mx-auto px-6 py-12 text-[var(--foreground)]">

            {/* Seller Info */}
            <section className="bg-[var(--card)] border border-[var(--border)] p-8 rounded-xl mb-16">
                <div className="flex items-center gap-6">
                    <img
                        src={seller.profile_image}
                        alt={seller.name}
                        className="w-32 h-32 rounded-full object-cover border border-[var(--border)]"
                    />

                    <div>
                        <h1 className="text-4xl font-serif font-bold">{seller.name}</h1>
                        <p className="text-[var(--foreground)]/70 mt-2">{seller.bio}</p>
                    </div>
                </div>

                <button
                    onClick={() => alert("Open create form modal")}
                    className="mt-6 px-6 py-3 bg-[var(--accent)] text-white rounded-lg hover:opacity-90"
                >
                    Add New Product
                </button>
            </section>

            {/* Products List */}
            <section>
                <h2 className="text-3xl font-serif font-bold mb-6">Your Products</h2>

                {products.length === 0 && (
                    <p className="text-[var(--foreground)]/60">No products yet.</p>
                )}

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-sm p-4"
                        >
                            <img
                                src={product.image_url}
                                className="w-full h-48 object-cover rounded-lg"
                            />

                            <h3 className="text-xl font-serif font-bold mt-4">{product.title}</h3>
                            <p className="text-[var(--accent)] font-semibold">
                                ${product.price}
                            </p>

                            <div className="flex gap-3 mt-4">
                                <button
                                    className="px-4 py-2 bg-[var(--accent)] text-white rounded-lg hover:opacity-90"
                                    onClick={() => alert("Open edit modal")}
                                >
                                    Edit
                                </button>

                                <button
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:opacity-90"
                                    onClick={() => alert("Confirm delete")}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
