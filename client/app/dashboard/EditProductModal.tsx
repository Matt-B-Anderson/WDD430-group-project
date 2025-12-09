"use client";

import { useState, useEffect } from "react";

export default function EditProductModal({ product, sellerId, onClose, onUpdated }: any) {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (product) {
            setTitle(product.title);
            setPrice(String(product.price));
            setDescription(product.description);
            setImageUrl(product.image_url);
            setCategory(product.category);
        }
    }, [product]);

    async function handleSubmit(e: any) {
        e.preventDefault();
        setLoading(true);
        setError("");

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/products/${product.id}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    price: Number(price),
                    description,
                    image_url: imageUrl,
                    category,
                    seller_id: sellerId,
                }),
            }
        );

        const data = await res.json();

        if (!res.ok) {
            setError(data.error || "Failed to update product");
            setLoading(false);
            return;
        }

        onUpdated();
        onClose();
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-[var(--card)] border border-[var(--border)] p-8 rounded-xl w-full max-w-lg shadow-xl">

                <h2 className="text-2xl font-serif font-bold mb-4">
                    Edit Product
                </h2>

                {error && <p className="text-red-500 mb-3">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1">Title</label>
                        <input
                            className="w-full px-4 py-2 border border-[var(--border)] rounded-lg bg-[var(--background)]"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block mb-1">Price</label>
                        <input
                            type="number"
                            className="w-full px-4 py-2 border border-[var(--border)] rounded-lg bg-[var(--background)]"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block mb-1">Category</label>
                        <input
                            className="w-full px-4 py-2 border border-[var(--border)] rounded-lg bg-[var(--background)]"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block mb-1">Image URL</label>
                        <input
                            className="w-full px-4 py-2 border border-[var(--border)] rounded-lg bg-[var(--background)]"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block mb-1">Description</label>
                        <textarea
                            rows={3}
                            className="w-full px-4 py-2 border border-[var(--border)] rounded-lg bg-[var(--background)]"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 text-[var(--foreground)]"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-[var(--accent)] text-white rounded-lg hover:opacity-90 disabled:opacity-50"
                        >
                            {loading ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
