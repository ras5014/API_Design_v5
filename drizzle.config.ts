import { defineConfig } from "drizzle-kit";
import env from "./src/config/env.ts";

// Drizzle Kit CLI configuration.
// This file controls how migrations are generated and where DB connection
// details are taken from when running commands like `db:push` and `generate`.
export default defineConfig({
  // Path to the Drizzle schema file that defines your database tables.
  schema: "./src/db/schema.ts",

  // Directory where generated SQL migration files are stored.
  out: "./migrations",

  // Database engine used by this project.
  dialect: "postgresql",

  // Connection settings used by Drizzle Kit for schema push/migration actions.
  dbCredentials: {
    // Read the PostgreSQL connection string from validated environment config.
    url: env.DATABASE_URL,
  },

  // Print detailed logs while running Drizzle CLI commands.
  verbose: true,

  // Enable strict mode to catch unsafe/ambiguous migration operations.
  strict: true,
});
