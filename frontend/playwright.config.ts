import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  workers: 1,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:8000",
    trace: "retain-on-failure",
    channel: process.env.PLAYWRIGHT_CHANNEL || "chrome",
  },
  webServer: {
    command: "npm run dev:storefront",
    url: "http://127.0.0.1:8000/api/health",
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
