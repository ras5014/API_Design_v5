import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Adds testing functions like describe, beforeAll, and test to the global space so they don't need to be imported in every test file
    globals: true,
    // Before running any tests, Run this file first
    globalSetup: ["./tests/setup/globalSetup.ts"],
    // Automatically clean up after each test to ensure isolation
    clearMocks: true,
    restoreMocks: true,
    // Ensure tests run sequentially to avoid database conflicts
    pool: "threads",
    poolOptions: {
      threads: {
        singleThread: true,
      },
    },
  },
  plugins: [],
});
