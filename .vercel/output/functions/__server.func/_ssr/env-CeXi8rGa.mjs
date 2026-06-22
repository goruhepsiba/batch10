function validateEnv() {
  const isServer = typeof window === "undefined";
  if (isServer && typeof process !== "undefined") {
    const secretKey = process.env.CLERK_SECRET_KEY;
    if (!secretKey) {
      throw new Error(
        "CRITICAL: Missing environment variable CLERK_SECRET_KEY. Please configure the secret key on your server."
      );
    }
  }
}
export {
  validateEnv as v
};
