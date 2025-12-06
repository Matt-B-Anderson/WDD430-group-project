import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
	function middleware(req) {
		const { pathname } = req.nextUrl;
		const token = req.nextauth.token;

		if (!token) {
			return NextResponse.redirect(new URL("/login", req.url));
		}

		if (pathname.startsWith("/sellers")) {
			if (token.role !== "seller") {
				return NextResponse.redirect(new URL("/", req.url));
			}
		}

		return NextResponse.next();
	},

	{
		callbacks: {
			authorized: ({ token }) => !!token,
		},
	}
);

export const config = {
	matcher: [
		"/dashboard/:path*",
		"/sellers/:path*",
	],
};
