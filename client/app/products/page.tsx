"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState("");
    const [min, setMin] = useState("");
    const [max, setMax] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        async function load() {
            const params = new URLSearchParams();

            if (category) params.append("category", category);
            if (min) params.append("min", min);
            if (max) params.append("max", max);
            if (search) params.append("search", search);

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/products?${params.toString()}`
            );

            const data = await res.json();
            setProducts(data);
        }

        load();
    }, [category, min, max, search]);

    return (
        <main className="max-w-7xl mx-auto px-6 py-12">

            <section className="bg-[var(--card)] border border-[var(--border)] p-6 rounded-xl mb-8">
                <h2 className="text-2xl font-serif font-bold mb-4">Filters</h2>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                    <select
                        className="bg-[var(--background)] border border-[var(--border)] p-2 rounded"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        <option value="Ceramics">Ceramics</option>
                        <option value="Textiles">Textiles</option>
                        <option value="Jewelry">Jewelry</option>
                        <option value="Woodwork">Woodwork</option>
                        <option value="Home Decor">Home Decor</option>
                    </select>

                    <input
                        type="number"
                        placeholder="Min Price"
                        className="bg-[var(--background)] border border-[var(--border)] p-2 rounded"
                        value={min}
                        onChange={(e) => setMin(e.target.value)}
                    />

                    <input
                        type="number"
                        placeholder="Max Price"
                        className="bg-[var(--background)] border border-[var(--border)] p-2 rounded"
                        value={max}
                        onChange={(e) => setMax(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Search"
                        className="bg-[var(--background)] border border-[var(--border)] p-2 rounded"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>
            </section>

            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map((p: any) => (
                    <Link href={`products/${p.id}`} key={p.id}>
                    <div
                        
                        className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 shadow-sm hover:shadow-md transition"
                    >
                        <img src={p.image_url} className="w-full h-48 object-cover rounded" />
                        <h3 className="mt-3 text-xl font-serif font-bold">{p.title}</h3>
                        <p className="text-[var(--accent)] font-semibold">${p.price}</p>
                        <p className="text-[var(--foreground)]/70 text-sm">
                            {p.seller_name}
                        </p>
                    </div>
                    </Link>
                ))}
            </section>

        </main>
    );
}