export default function Home() {
    return (
        <main className="bg-[#F5EDE0] min-h-screen text-[#3A2E2A]">
            {/* NAVBAR */}
            <header className="border-b border-[#E0D6CF] bg-[#F5EDE0] sticky top-0 z-50">
                <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
                    <h1 className="text-2xl font-serif font-bold">Handcrafted Haven</h1>

                    <input
                        type="text"
                        placeholder="Search handcrafted items..."
                        className="hidden md:block bg-[#FAF7F2] border border-[#E0D6CF] px-4 py-2 rounded-lg w-1/3"
                    />

                    <nav className="space-x-6 font-medium">
                        <a href="#" className="hover:text-[#D97C59]">Categories</a>
                        <a href="#" className="hover:text-[#D97C59]">Login</a>
                    </nav>
                </div>
            </header>

            {/* HERO */}
            <section className="py-20 bg-[#F5EDE0]">
                <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
                    <div className="flex-1">
                        <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight">
                            Discover Authentic Handmade Creations
                        </h2>
                        <p className="mt-4 text-lg text-[#4F4F4F]">
                            One-of-a-kind items crafted with love and passion.
                        </p>
                        <button className="mt-6 px-6 py-3 rounded-lg bg-[#D97C59] text-white text-lg font-semibold hover:bg-[#c46f50] transition">
                            Explore Marketplace
                        </button>
                    </div>

                    <div className="flex-1">
                        <img
                            className="rounded-xl shadow-lg"
                            src="https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa"
                            alt="Handcrafted items"
                        />
                    </div>
                </div>
            </section>

            {/* CATEGORIES */}
            <section className="py-16 bg-[#FAF7F2]">
                <h3 className="text-3xl font-serif font-bold text-center">
                    Shop by Category
                </h3>

                <div className="flex flex-wrap justify-center gap-4 mt-8 px-4">
                    {["Ceramics", "Woodwork", "Textiles", "Jewelry", "Home Decor"].map(
                        (cat) => (
                            <span
                                key={cat}
                                className="px-6 py-2 bg-[#E0D6CF] rounded-full text-[#3A2E2A] hover:shadow-md transition cursor-pointer"
                            >
                                {cat}
                            </span>
                        )
                    )}
                </div>
            </section>

            {/* FEATURED SELLERS */}
            <section className="py-16">
                <h3 className="text-3xl font-serif font-bold text-center">
                    Meet the Artisans
                </h3>

                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 mt-12 px-6">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="bg-[#F5EDE0] border border-[#E0D6CF] p-6 rounded-xl shadow-sm hover:shadow-md transform hover:-translate-y-1 transition"
                        >
                            <img
                                className="w-full h-56 object-cover rounded-lg mb-4"
                                src={`https://picsum.photos/seed/seller${i}/400/300`}
                                alt="Artisan"
                            />
                            <h4 className="text-xl font-serif font-bold">Artisan Name</h4>
                            <p className="text-[#4F4F4F]">Specialty Craft</p>
                            <button className="mt-4 px-4 py-2 bg-[#D97C59] text-white rounded-lg hover:bg-[#c46f50]">
                                View Profile
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* POPULAR PRODUCTS */}
            <section className="py-16 bg-[#FAF7F2]">
                <h3 className="text-3xl font-serif font-bold text-center">
                    Popular Handmade Creations
                </h3>

                <div className="max-w-7xl mx-auto grid md:grid-cols-3 lg:grid-cols-4 gap-8 mt-12 px-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div
                            key={i}
                            className="bg-[#F5EDE0] border border-[#E0D6CF] rounded-xl shadow-sm hover:shadow-md transition"
                        >
                            <img
                                className="w-full h-48 object-cover rounded-t-xl"
                                src={`https://picsum.photos/seed/prod${i}/500/400`}
                                alt="Product"
                            />
                            <div className="p-4">
                                <h4 className="text-xl font-serif font-bold">Product Name</h4>
                                <p className="text-[#D97C59] font-semibold mt-1">$24.99</p>
                                <p className="text-[#6E7F4E] mt-1">Handmade by Artisan</p>
                                <p className="mt-2 text-[#D4A350]">★★★★☆</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* NEWSLETTER */}
            <section className="bg-[#D97C59] text-white py-14 mt-16">
                <div className="text-center max-w-3xl mx-auto px-6">
                    <h3 className="text-3xl font-serif font-bold">
                        Join Our Handmade Community
                    </h3>
                    <p className="mt-2">
                        Get artisan spotlights, new product drops, and exclusive updates.
                    </p>

                    <div className="flex flex-col md:flex-row gap-4 mt-6 justify-center">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="px-4 py-3 text-[#3A2E2A] rounded-lg w-full md:w-1/2"
                        />
                        <button className="px-6 py-3 bg-[#3A2E2A] rounded-lg hover:bg-[#2e221e]">
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="bg-[#3A2E2A] text-[#F5EDE0] py-10 mt-16">
                <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10 px-6">
                    <div>
                        <h4 className="font-serif font-bold text-xl mb-3">Handcrafted Haven</h4>
                        <p>Your home for authentic artisan goods.</p>
                    </div>

                    <div>
                        <h4 className="font-serif font-bold text-lg mb-3">Company</h4>
                        <ul className="space-y-2">
                            <li>About</li>
                            <li>Contact</li>
                            <li>Community</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-serif font-bold text-lg mb-3">For Sellers</h4>
                        <ul className="space-y-2">
                            <li>Become a Seller</li>
                            <li>Dashboard</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-serif font-bold text-lg mb-3">Help</h4>
                        <ul className="space-y-2">
                            <li>FAQ</li>
                            <li>Shipping</li>
                            <li>Returns</li>
                        </ul>
                    </div>
                </div>
            </footer>
        </main>
    );
}