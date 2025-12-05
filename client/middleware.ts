import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
	function middleware(req) {
		const { pathname } = req.nextUrl;
		const user = req.nextauth.token;

		if (!user) {
			const loginUrl = new URL("/login", req.url);
			return NextResponse.redirect(loginUrl);
		}

		if (pathname.startsWith("/sellers")) {
			if (user.role !== "seller") {
				return NextResponse.redirect(new URL("/", req.url));
			}
		}

		if (pathname.includes("/dashboard") && user.role !== "seller") {
			return NextResponse.redirect(new URL("/", req.url));
		}

		return NextResponse.next();
	},

	{
		callbacks: {
			authorized: ({ token }) => !!token,
		},
	}
);
