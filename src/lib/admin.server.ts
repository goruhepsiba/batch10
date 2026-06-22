import { requireRole } from "./auth.server";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { clerkClient } from "@clerk/tanstack-react-start/server";

export async function getUsers() {
  await requireRole("admin");

  const { data: users, error } = await supabaseAdmin
    .from("users")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return users || [];
}

export async function changeUserRole(targetUserId: string, role: string) {
  await requireRole("admin");

  // Update in database
  const { error: dbError } = await supabaseAdmin
    .from("users")
    .update({ role, updated_at: new Date().toISOString() })
    .eq("clerk_user_id", targetUserId);

  if (dbError) throw dbError;

  // Sync role to Clerk publicMetadata
  try {
    const client = await clerkClient();
    await client.users.updateUserMetadata(targetUserId, {
      publicMetadata: {
        role,
      },
    });
  } catch (clerkErr) {
    console.warn("Failed to sync role metadata to Clerk:", clerkErr);
  }

  return { success: true };
}
