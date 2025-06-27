// can directly migrate using - "drizzle-kit migrate" or have this script to run migrations programmatically

import { migrate } from "drizzle-orm/neon-http/migrator";
import {drizzle} from "drizzle-orm/neon-http";
import {neon} from "@neondatabase/serverless";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined in the environment variables.");
}

async function runMigrations() {
    const sql = neon(process.env.DATABASE_URL!);
    const db = drizzle(sql);
    try {
        await migrate(db, {
            migrationsFolder: "./drizzle"
        });   
        console.log("Migrations completed successfully.");
    } catch (error) {
        console.error("Error running migrations:", error);
    }
}

runMigrations()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Migration script failed:", error);
        process.exit(1);
    });