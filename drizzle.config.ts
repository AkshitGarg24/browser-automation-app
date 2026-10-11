import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

// Prioritize .env.local used by Next.js
config({ path: ".env.local" });
config({ path: ".env" });

const dbUrl = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;

if (!dbUrl) {
  throw new Error("DATABASE_URL_UNPOOLED or DATABASE_URL is not set in environment");
}

export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: dbUrl,
  },
});
