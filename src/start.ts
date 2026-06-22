import { createStart, createMiddleware, createCsrfMiddleware } from "@tanstack/react-start";
import { clerkMiddleware } from "@clerk/tanstack-react-start/server";
import { validateEnv } from "./lib/env";

import { renderErrorPage } from "./lib/error-page";

// Load .env dynamically at server startup (for npm start)
if (typeof window === "undefined") {
  try {
    const fsName = "node:fs";
    const pathName = "node:path";
    const fs = await import(fsName);
    const path = await import(pathName);

    const envPath = path.resolve(process.cwd(), ".env");
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, "utf-8");
      for (const line of envContent.split("\n")) {
        const match = line.match(/^\s*([^#=]+)\s*=\s*(.*)?$/);
        if (match) {
          const key = match[1].trim();
          let value = (match[2] || "").trim();
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
    console.warn("Failed to load .env variables:", e);
  }
}

// Validate env variables before start configuration
validateEnv();

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

const csrfMiddleware = createCsrfMiddleware({
  filter: (ctx) => ctx.handlerType === "serverFn",
});

export const startInstance = createStart(() => ({
  requestMiddleware: [clerkMiddleware(), errorMiddleware, csrfMiddleware],
}));
