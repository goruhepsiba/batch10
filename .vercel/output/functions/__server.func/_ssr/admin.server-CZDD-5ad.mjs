import { r as requireRole, s as supabaseAdmin } from "./auth.server-Dx7c1dUI.mjs";
import { c as clerkClient } from "./clerkClient-D1RTEUpt.mjs";
import "../_libs/clerk__backend.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "./env-Bu12Jr7a.mjs";
import "../_libs/clerk__shared.mjs";
import "../_libs/dequal.mjs";
import "./getGlobalStartContext-DRMFhrIa.mjs";
import "./server-rHDi7l_h.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/scheduler.mjs";
import "../_libs/isbot.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "node:fs";
import "node:path";
import "node:process";
import "node:crypto";
async function getUsers() {
  await requireRole("admin");
  const { data: users, error } = await supabaseAdmin.from("users").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return users || [];
}
async function changeUserRole(targetUserId, role) {
  await requireRole("admin");
  const { error: dbError } = await supabaseAdmin.from("users").update({ role, updated_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("clerk_user_id", targetUserId);
  if (dbError) throw dbError;
  try {
    const client = await clerkClient();
    await client.users.updateUserMetadata(targetUserId, {
      publicMetadata: {
        role
      }
    });
  } catch (clerkErr) {
    console.warn("Failed to sync role metadata to Clerk:", clerkErr);
  }
  return { success: true };
}
export {
  changeUserRole,
  getUsers
};
