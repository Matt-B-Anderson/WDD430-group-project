"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();

        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if (res?.error) {
            setError("Invalid email or password");
            return;
        }

        router.refresh();

        setTimeout(() => {
            router.push("/dashboard");
        }, 200);
    }

    return (
        <main className="max-w-md mx-auto mt-20 bg-[var(--card)] border border-[var(--border)] p-8 rounded-xl">
            <h1 className="text-3xl font-serif font-bold text-center mb-6">Login</h1>

            <form onSubmit={handleLogin} className="space-y-4">
                {error && (
                    <p className="text-red-500 text-center">{error}</p>
                )}

                <div>
                    <label className="block mb-1">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)]"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)]"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-[var(--accent)] text-white py-3 rounded-lg font-semibold hover:opacity-90"
                >
                    Login
                </button>
            </form>
        </main>
    );
}
