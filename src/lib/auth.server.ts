import { auth, clerkClient } from "@clerk/tanstack-react-start/server";
import { redirect } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export interface DBUser {
  id: string;
  clerk_user_id: string;
  email: string;
  full_name: string | null;
  image_url: string | null;
  role: string;
  created_at: string;
  updated_at: string;
}

/**
 * Synchronizes the currently authenticated Clerk user into the database's `users` table.
 * If the user is missing from the database, it inserts a new record with role 'tourist'.
 * If the profile has changed, it updates the record.
 */
export async function syncUser(): Promise<DBUser | null> {
  const { userId } = await auth();
  if (!userId) return null;

  try {
    const client = await clerkClient();
    const clerkUser = await client.users.getUser(userId);

    const email = clerkUser.emailAddresses[0]?.emailAddress ?? "";
    const fullName = clerkUser.fullName ?? clerkUser.username ?? email.split("@")[0];
    const imageUrl = clerkUser.imageUrl ?? null;

    // Check if user already exists in public.users
    const { data: existingUser, error: selectError } = await supabaseAdmin
      .from("users")
      .select("*")
      .eq("clerk_user_id", userId)
      .maybeSingle();

    if (selectError) {
      console.error("[Auth Server] Error selecting user from db:", selectError);
    }

    if (!existingUser) {
      // Create new record
      try {
        const { data: newUser, error: insertError } = await supabaseAdmin
          .from("users")
          .insert({
            clerk_user_id: userId,
            email,
            full_name: fullName,
            image_url: imageUrl,
            role: "tourist",
          })
          .select("*")
          .single();

        if (insertError) {
          throw insertError;
        }
        return newUser as unknown as DBUser;
      } catch (err: any) {
        // Handle race conditions where a parallel request has just inserted this user
        if (err?.code === "23505" || err?.message?.includes("already exists")) {
          const { data: retriedUser } = await supabaseAdmin
            .from("users")
            .select("*")
            .eq("clerk_user_id", userId)
            .maybeSingle();
          if (retriedUser) {
            return retriedUser as unknown as DBUser;
          }
        }
        console.error("[Auth Server] Error inserting user to db:", err);
        throw err;
      }
    } else {
      // Check if profile needs update
      const needsUpdate =
        existingUser.email !== email ||
        existingUser.full_name !== fullName ||
        existingUser.image_url !== imageUrl;

      if (needsUpdate) {
        const { data: updatedUser, error: updateError } = await supabaseAdmin
          .from("users")
          .update({
            email,
            full_name: fullName,
            image_url: imageUrl,
            updated_at: new Date().toISOString(),
          })
          .eq("clerk_user_id", userId)
          .select("*")
          .single();

        if (updateError) {
          console.error("[Auth Server] Error updating user profile in db:", updateError);
          throw updateError;
        }
        return updatedUser as unknown as DBUser;
      }

      return existingUser as unknown as DBUser;
    }
  } catch (err) {
    console.error("[Auth Server] syncUser exception:", err);
    return null;
  }
}

/**
 * Returns the currently authenticated database user.
 */
export async function getCurrentUser(): Promise<DBUser | null> {
  return await syncUser();
}

/**
 * Asserts that the request is authenticated. Redirects to /sign-in if not.
 */
export async function requireAuth(): Promise<DBUser> {
  const { userId } = await auth();
  if (!userId) {
    throw redirect({
      to: "/sign-in/$",
    });
  }

  const user = await getCurrentUser();
  if (!user) {
    throw new Error(
      "Authentication Sync Error: Failed to synchronize your authenticated user profile with the database. " +
      "This usually happens if your SUPABASE_SERVICE_ROLE_KEY is missing or commented out in your .env file, " +
      "or if the dev server was not restarted after updating the environment variables."
    );
  }

  return user;
}

/**
 * Asserts that the request is authenticated and the user has a specific role.
 * Redirects to / if unauthorized or mismatch.
 */
export async function requireRole(role: string): Promise<DBUser> {
  const user = await requireAuth();
  if (user.role !== role) {
    throw redirect({
      to: "/",
    });
  }
  return user;
}
