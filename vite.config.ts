import { defineConfig } from "@lovable.dev/vite-tanstack-config";

/** Use NITRO_PRESET=node-server on Render; defaults to Vercel serverless. */
const nitroPreset = process.env.NITRO_PRESET || "vercel";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  nitro: {
    preset: nitroPreset,
  },
});
