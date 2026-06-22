import { createServerFn } from "@tanstack/react-start";

/**
 * Server function to check if the user is authenticated.
 * Throws a redirect to `/sign-in/$` if not authenticated.
 */
export const checkAuth = createServerFn({ method: "GET" })
  .handler(async () => {
    const { requireAuth } = await import("@/lib/auth.server");
    return await requireAuth();
  });

/**
 * Server function to check if the user has the admin role.
 * Throws a redirect to `/` if not an admin.
 */
export const checkAdmin = createServerFn({ method: "GET" })
  .handler(async () => {
    const { requireRole } = await import("@/lib/auth.server");
    return await requireRole("admin");
  });

/**
 * Server function to synchronize the user session into the database.
 */
export const syncUserSession = createServerFn({ method: "POST" })
  .handler(async () => {
    const { syncUser } = await import("@/lib/auth.server");
    return await syncUser();
  });
