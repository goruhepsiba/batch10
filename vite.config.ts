import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import * as fs from "node:fs";
import * as path from "node:path";

// Manually parse .env file to populate process.env before defining config
try {
  const envPath = path.resolve(process.cwd(), ".env");
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf-8");
    for (const line of envContent.split("\n")) {
      const match = line.match(/^\s*([^#=]+)\s*=\s*(.*)?$/);
      if (match) {
        const key = match[1].trim();
        let value = (match[2] || "").trim();
        // Remove quotes if present
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1);
        } else if (value.startsWith("'") && value.endsWith("'")) {
          value = value.slice(1, -1);
        }
        if (!process.env[key]) {
          process.env[key] = value;
        }
      }
    }
  }
} catch (e) {
  console.error("Failed to parse .env file:", e);
}

/** Use NITRO_PRESET=node-server on Render; defaults to Vercel serverless. */
const nitroPreset = process.env.NITRO_PRESET || "vercel";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  nitro: {
    preset: nitroPreset,
  },
  ssr: {
    noExternal: ["tslib"],
  },
} as any);
