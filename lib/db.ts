import { config } from "dotenv";
config({ path: ".env.local" });
config({ path: ".env" });

import { drizzle as drizzleHttp } from "drizzle-orm/neon-http";
import { drizzle as drizzleServerless } from "drizzle-orm/neon-serverless";
import { neon, Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";

import * as schema from "./db/schema";

const pooledUrl = process.env.DATABASE_URL;
const directUrl = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;

if (!pooledUrl) {
  throw new Error("DATABASE_URL is not defined in environment");
}

// 1. PRIMARY CLIENT: Neon Serverless (HTTP)
// Used for everyday queries, Server Actions, Route Handlers (stateless, zero connection limits)
const sql = neon(pooledUrl);
export const db = drizzleHttp(sql, { schema });

// 2. DIRECT CLIENT: Neon WebSocket / Serverless Pool
// Used for complex multi-step interactive ACID transactions requiring continuous session state
neonConfig.webSocketConstructor = ws;
export const poolDirect = new Pool({ connectionString: directUrl });
export const dbDirect = drizzleServerless(poolDirect, { schema });
