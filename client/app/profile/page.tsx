"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function ProfilePage() {
    const { data: session } = useSession();

    if (!session?.user)
        return <p className="text-center mt-10">You must log in to view your profile.</p>;

    const { name, email, role, seller_id } = session.user;

    return (
        <main className="max-w-2xl mx-auto mt-12 p-6 bg-[var(--card)] border border-[var(--border)] rounded-xl">
            <h1 className="text-3xl font-serif font-bold mb-4">Your Profile</h1>

            <p><strong>Name:</strong> {name}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Role:</strong> {role}</p>

            {role === "seller" && (
                <Link
                    href={`/sellers/${seller_id}/dashboard`}
                    className="inline-block mt-6 px-5 py-3 bg-[var(--accent)] text-white rounded-lg"
                >
                    Go to Seller Dashboard
                </Link>
            )}

            {role === "buyer" && (
                <p className="mt-6 text-[var(--foreground)]/70">
                    You are logged in as a buyer.
                </p>
            )}
        </main>
    );
}
