import "./globals.css";
import Link from "next/link";
import { Playfair_Display, Inter } from "next/font/google";
import { useSession } from "next-auth/react";

// Load fonts as CSS variables
const playfair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-playfair",
});

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "500", "600"],
    variable: "--font-inter",
});

export const metadata = {
    title: "Handcrafted Haven",
    description: "Authentic artisan-made creations.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const { data: session } = useSession();
    return (
        <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
            <body className="bg-\[var\(--background\)\] text-\[var\(--foreground\)\]">

                {/* HEADER */}
                <header className="border-b border-\[var\(--border\)\] bg-[#3A2E2A] sticky top-0 z-40">
                    <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

                        <Link href="/" className="text-2xl font-serif font-bold">
                            Handcrafted Haven
                        </Link>

                        <input
                            type="text"
                            placeholder="Search handcrafted items..."
                            className="hidden md:block bg-\[var\(--card\)\] border border-\[var\(--border\)\] px-4 py-2 rounded-lg w-1/3 text-\[var\(--foreground\)\]"
                        />

                        <nav className="space-x-6">
                        <Link href="/products">Products</Link>

                        {session?.user ? (
                            <>
                                <Link href="/dashboard">Dashboard</Link>
                                <Link href="/api/auth/logout">Logout</Link>
                            </>
                        ) : (
                            <Link href="/login">Login</Link>
                        )}
                    </nav>

                    </div>
                </header>

                {/* MAIN */}
                <main className="min-h-[75vh]">{children}</main>

                {/* FOOTER */}
                <footer className="bg-[#3A2E2A] text-[#F5EDE0] py-12 mt-20">
                    <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10 px-6">

                        <div>
                            <h4 className="font-serif font-bold text-xl mb-3">Handcrafted Haven</h4>
                            <p>Celebrating meaningful craftsmanship.</p>
                        </div>

                        <div>
                            <h4 className="font-serif font-bold text-lg mb-3">Company</h4>
                            <ul className="space-y-2">
                                <li>About</li>
                                <li>Community</li>
                                <li>Contact</li>
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
                                <li>Shipping</li>
                                <li>FAQ</li>
                                <li>Returns</li>
                            </ul>
                        </div>

                    </div>
                </footer>

            </body>
        </html>
    );
}
