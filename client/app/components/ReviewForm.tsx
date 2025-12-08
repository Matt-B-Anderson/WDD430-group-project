"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function ReviewForm({ productId }: { productId: string }) {
    const { data: session } = useSession();
    const router = useRouter();

    const [rating, setRating] = useState(5);
    const [review, setReview] = useState("");

    async function submitReview(e: any) {
        e.preventDefault();

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                product_id: productId,
                user_id: session?.user.id,
                rating,
                review,
            }),
        });

        if (res.ok) {
            router.refresh(); // Refresh page data without navigating
            setReview("");
        } else {
            alert("Failed to submit review.");
        }
    }

    return (
        <form onSubmit={submitReview} className="mt-12 bg-[var(--card)] border border-[var(--border)] p-6 rounded-xl">
            <h3 className="text-2xl font-serif font-bold mb-4">Leave a Review</h3>

            <label className="block text-sm font-medium">Rating</label>
            <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="mt-1 p-2 border border-[var(--border)] rounded-lg bg-[var(--background)]"
            >
                {[5, 4, 3, 2, 1].map((n) => (
                    <option key={n} value={n}>{n} Stars</option>
                ))}
            </select>

            <label className="block mt-4 text-sm font-medium">Review</label>
            <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="w-full mt-1 p-3 border border-[var(--border)] rounded-lg bg-[var(--background)]"
            />

            <button
                type="submit"
                className="mt-4 px-6 py-3 bg-[var(--accent)] text-white rounded-lg hover:opacity-90"
            >
                Submit Review
            </button>
        </form>
    );
}
