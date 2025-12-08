import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const handler = NextAuth({
	providers: [
		Credentials({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					return null;
				}

				const res = await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
					{
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							email: credentials.email,
							password: credentials.password,
						}),
					}
				);

				const user = await res.json();

				if (!res.ok) return null;

				return {
					id: user.id,
					name: user.name,
					email: user.email,
					role: user.role,
					seller_id: user.seller_id,
				};
			},
		}),
	],

	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.name = user.name;
				token.email = user.email;
				token.role = user.role;
				token.seller_id = user.seller_id;
			}
			return token;
		},

		async session({ session, token }) {
			session.user.id = token.id;
			session.user.name = token.name;
			session.user.email = token.email;
			session.user.role = token.role;
			session.user.seller_id = token.seller_id;
			return session;
		},
	},
});

export { handler as GET, handler as POST };
