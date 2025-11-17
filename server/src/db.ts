import postgres from "postgres";

if (!process.env.POSTGRES_URL) {
	throw new Error("POSTGRES_URL is missing");
}

const sql = postgres(process.env.POSTGRES_URL, {
	ssl: "require",
});

export default sql;
