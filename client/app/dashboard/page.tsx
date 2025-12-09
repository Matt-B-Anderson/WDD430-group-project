"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import AddProductModal from "./AddProductModal";
import EditProductModal from "./EditProductModal";
import DeleteProductModal from "./DeleteProductModal";

export default function Dashboard() {
    const { data: session, status } = useSession();
    const [products, setProducts] = useState<any[]>([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState<any>(null);
    const [deletingProduct, setDeletingProduct] = useState<any>(null);

    const isSeller = session?.user?.role === "seller";

    if (status === "loading") return <p>Loading session...</p>;
    if (!session?.user) return redirect("/login");

    async function loadProducts() {
        if (!isSeller) return;

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/products?seller_id=${session.user.seller_id}`
        );
        const data = await res.json();
        setProducts(data);
    }

    useEffect(() => {
        loadProducts();
    }, [session]);

    return (
        <main className="max-w-7xl mx-auto px-6 py-12 text-[var(--foreground)]">
            <h1 className="text-4xl font-serif font-bold mb-8">
                Welcome, {session.user.name}
            </h1>

            <section className="bg-[var(--card)] border border-[var(--border)] p-6 rounded-xl mb-16">
                <h2 className="text-2xl font-serif font-bold mb-4">Your Profile</h2>
                <p><strong>Email:</strong> {session.user.email}</p>
                <p><strong>Role:</strong> {session.user.role}</p>
            </section>

            {isSeller && (
                <>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-serif font-bold">Your Products</h2>

                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="px-6 py-3 bg-[var(--accent)] text-white rounded-lg hover:opacity-90"
                        >
                            Add New Product
                        </button>
                    </div>

                    {products.length === 0 && (
                        <p className="text-[var(--foreground)]/60">No products yet.</p>
                    )}

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-sm p-4"
                            >
                                <Image
                                    src={product.image_url}
                                    width={400}
                                    height={300}
                                    alt={product.title}
                                    className="w-full h-48 object-cover rounded-lg"
                                />

                                <h3 className="text-xl font-serif font-bold mt-4">
                                    {product.title}
                                </h3>
                                <p className="text-[var(--accent)] font-semibold">
                                    ${product.price}
                                </p>

                                <div className="flex gap-3 mt-4">
                                    <button
                                        className="px-4 py-2 bg-[var(--accent)] text-white rounded-lg hover:opacity-90"
                                        onClick={() => setEditingProduct(product)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:opacity-90"
                                        onClick={() => setDeletingProduct(product)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {!isSeller && (
                <section>
                    <h2 className="text-3xl font-serif font-bold mb-6">
                        Your Activity
                    </h2>
                    <p className="text-[var(--foreground)]/70">
                        Orders, favorites, and browsing history will appear here.
                    </p>
                </section>
            )}

            {showCreateModal && (
                <AddProductModal
                    sellerId={session.user.seller_id}
                    onClose={() => setShowCreateModal(false)}
                    onCreated={loadProducts}
                />
            )}

            {editingProduct && (
                <EditProductModal
                    product={editingProduct}
                    sellerId={session.user.seller_id}
                    onClose={() => setEditingProduct(null)}
                    onUpdated={loadProducts}
                />
            )}

            {deletingProduct && (
                <DeleteProductModal
                    product={deletingProduct}
                    sellerId={session.user.seller_id}
                    onClose={() => setDeletingProduct(null)}
                    onDeleted={loadProducts}
                />
            )}
        </main>
    );
}
