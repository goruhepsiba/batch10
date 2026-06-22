/**
 * Validates that the necessary Clerk environment variables are set.
 * Throws a clear error if any required variable is missing.
 */
export function validateEnv() {
  const isServer = typeof window === "undefined";
  
  // In Vite/TanStack Start, VITE_ prefixed variables are available on client and server.
  const publishableKey =
    import.meta.env.VITE_CLERK_PUBLISHABLE_KEY ||
    (isServer && typeof process !== "undefined" ? process.env.VITE_CLERK_PUBLISHABLE_KEY : undefined);

  if (!publishableKey) {
    throw new Error(
      "CRITICAL: Missing environment variable VITE_CLERK_PUBLISHABLE_KEY. Please configure Clerk in your deployment settings."
    );
  }

  // Secret key should only be checked on the server.
  if (isServer && typeof process !== "undefined") {
    const secretKey = process.env.CLERK_SECRET_KEY;
    if (!secretKey) {
      throw new Error(
        "CRITICAL: Missing environment variable CLERK_SECRET_KEY. Please configure the secret key on your server."
      );
    }
  }
}
