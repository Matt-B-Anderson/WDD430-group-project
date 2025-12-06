"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export function NavBar() {
    const { data: session, status } = useSession();

    return (
        <nav className="flex items-center gap-6 font-medium">

            <Link href="/products" className="hover:text-[var(--accent)]">
                Products
            </Link>

            {status === "loading" && (
                <span className="opacity-70">...</span>
            )}

            {!session?.user && status !== "loading" && (
                <Link href="/login" className="hover:text-[var(--accent)]">
                    Login
                </Link>
            )}

            {session?.user && (
                <>
                    {/* User greeting */}
                    <span className="text-[var(--foreground)]/80">
                        Hi, {session.user.name}
                    </span>

                    {session.user.role === "seller" ? (
                        <Link
                            href={`/dashboard`}
                            className="hover:text-[var(--accent)]"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <Link
                            href={`/dashboard`}
                            className="hover:text-[var(--accent)]"
                        >
                            Dashboard
                        </Link>
                    )}

                    {/* Logout */}
                    <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="hover:text-[var(--accent)]"
                    >
                        Logout
                    </button>
                </>
            )}
        </nav>
    );
}
