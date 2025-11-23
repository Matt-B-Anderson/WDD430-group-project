import Link from "next/link";

export default function Home() {
    return (
        <main className="text-[var(--foreground)] bg-[var(--background)]">

            <section className="py-20 bg-[var(--background)]">
                <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">

                    {/* Left */}
                    <div className="flex-1">
                        <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight">
                            Discover Authentic Handmade Creations
                        </h2>

                        <p className="mt-4 text-lg text-[var(--foreground)]/70">
                            One-of-a-kind items crafted with love and passion.
                        </p>

                        <Link
                            href="/products"
                            className="mt-6 inline-block px-6 py-3 rounded-lg bg-[var(--accent)] text-white text-lg font-semibold hover:opacity-90 transition"
                        >
                            Explore Marketplace
                        </Link>
                    </div>

                    {/* Right */}
                    <div className="flex-1">
                        <img
                            className="rounded-xl shadow-lg"
                            src="https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa"
                            alt="Handcrafted items"
                        />
                    </div>
                </div>
            </section>


            <section className="py-16 bg-[var(--card)]">
                <h3 className="text-3xl font-serif font-bold text-center">
                    Shop by Category
                </h3>

                <div className="flex flex-wrap justify-center gap-4 mt-8 px-4">
                    {["Ceramics", "Woodwork", "Textiles", "Jewelry", "Home Decor"].map(
                        (cat) => (
                            <span
                                key={cat}
                                className="px-6 py-2 bg-[var(--border)] rounded-full text-[var(--foreground)] hover:shadow-md transition cursor-pointer"
                            >
                                {cat}
                            </span>
                        )
                    )}
                </div>
            </section>


            <section className="py-16 bg-[var(--background)]">
                <h3 className="text-3xl font-serif font-bold text-center">
                    Meet the Artisans
                </h3>

                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 mt-12 px-6">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="bg-[var(--card)] border border-[var(--border)] p-6 rounded-xl shadow-sm hover:shadow-md transform hover:-translate-y-1 transition"
                        >
                            <img
                                className="w-full h-56 object-cover rounded-lg mb-4"
                                src={`https://picsum.photos/seed/seller${i}/400/300`}
                                alt="Artisan"
                            />
                            <h4 className="text-xl font-serif font-bold">Artisan Name</h4>
                            <p className="text-[var(--foreground)]/70">Specialty Craft</p>

                            <button className="mt-4 px-4 py-2 bg-[var(--accent)] text-white rounded-lg hover:opacity-90">
                                View Profile
                            </button>
                        </div>
                    ))}
                </div>
            </section>


            <section className="py-16 bg-[var(--card)]">
                <h3 className="text-3xl font-serif font-bold text-center">
                    Popular Handmade Creations
                </h3>

                <div className="max-w-7xl mx-auto grid md:grid-cols-3 lg:grid-cols-4 gap-8 mt-12 px-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div
                            key={i}
                            className="bg-[var(--background)] border border-[var(--border)] rounded-xl shadow-sm hover:shadow-md transition"
                        >
                            <img
                                className="w-full h-48 object-cover rounded-t-xl"
                                src={`https://picsum.photos/seed/prod${i}/500/400`}
                                alt="Product"
                            />
                            <div className="p-4">
                                <h4 className="text-xl font-serif font-bold">Product Name</h4>

                                <p className="text-[var(--accent)] font-semibold mt-1">
                                    $24.99
                                </p>

                                <p className="text-[var(--foreground)]/70 mt-1">
                                    Handmade by Artisan
                                </p>

                                <p className="mt-2 text-[#D4A350]">★★★★☆</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

        </main>
    );
}
