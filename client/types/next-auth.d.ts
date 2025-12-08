import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface User {
        id: string;
        role: "seller" | "buyer";
        seller_id?: string | null;
        name: string;
        email: string;
    }

    interface Session {
        user: {
            id: string;
            role: "seller" | "buyer";
            seller_id?: string | null;
            name: string;
            email: string;
        } & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        role: "seller" | "buyer";
        seller_id?: string | null;
        name: string;
        email: string;
    }
}
