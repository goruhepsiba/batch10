import { e as errorThrower } from "./env-Bu12Jr7a.mjs";
import { g as getAuthObjectForAcceptedToken } from "../_libs/clerk__backend.mjs";
import { g as getGlobalStartContext } from "./getGlobalStartContext-DRMFhrIa.mjs";
import { c as clerkClient } from "./clerkClient-D1RTEUpt.mjs";
import { T as redirect } from "../_libs/tanstack__router-core.mjs";
import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
import * as fs from "node:fs";
import * as path from "node:path";
import process from "node:process";
import "../_libs/clerk__shared.mjs";
import "../_libs/react.mjs";
import "../_libs/dequal.mjs";
import "node:crypto";
import "./server-rHDi7l_h.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/seroval.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/scheduler.mjs";
import "../_libs/isbot.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
const createErrorMessage = (msg) => {
  return `🔒 Clerk: ${msg.trim()}

For more info, check out the docs: https://clerk.com/docs,
or come say hi in our discord server: https://clerk.com/discord

`;
};
createErrorMessage(`
  You're calling 'getAuth()' from a server function, without providing the request object.
  Example:

  export const someServerFunction = createServerFn({ method: 'GET' }).handler(async () => {
    const request = getWebRequest()
    const auth = getAuth(request);
    ...
  });
  `);
const clerkMiddlewareNotConfigured = createErrorMessage(`
It looks like you're trying to use Clerk without configuring the middleware.

To fix this, make sure you have the \`clerkMiddleware()\` configured in your \`createStart()\` function in your \`src/start.ts\` file.`);
const auth = (async (opts) => {
  const authObjectFn = getGlobalStartContext().auth;
  if (!authObjectFn) return errorThrower.throw(clerkMiddlewareNotConfigured);
  return getAuthObjectForAcceptedToken({
    authObject: await Promise.resolve(authObjectFn({ treatPendingAsSignedOut: opts?.treatPendingAsSignedOut })),
    acceptsToken: opts?.acceptsToken
  });
});
const MOCK_DB_FILE = path.join(process.cwd(), ".tanstack", "mock-db.json");
function isSupabaseAdminConfigured() {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) return false;
  if (SUPABASE_URL === "https://your-project.supabase.co" || SUPABASE_SERVICE_ROLE_KEY === "your-service-role-key") {
    return false;
  }
  return true;
}
function getStorageItem(key) {
  try {
    if (!fs.existsSync(MOCK_DB_FILE)) return null;
    const db = JSON.parse(fs.readFileSync(MOCK_DB_FILE, "utf8"));
    return db[key] || null;
  } catch {
    return null;
  }
}
function setStorageItem(key, val) {
  try {
    const dir = path.dirname(MOCK_DB_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const db = fs.existsSync(MOCK_DB_FILE) ? JSON.parse(fs.readFileSync(MOCK_DB_FILE, "utf8")) : {};
    db[key] = val;
    fs.writeFileSync(MOCK_DB_FILE, JSON.stringify(db, null, 2), "utf8");
  } catch (err) {
    console.error("Failed to write to mock database file:", err);
  }
}
function createMockSupabaseAdminClient() {
  class MockQueryBuilder {
    tableName;
    filters = [];
    orderByField = null;
    orderAscending = true;
    action = "select";
    insertData = null;
    updateData = null;
    isSingle = false;
    constructor(tableName) {
      this.tableName = tableName;
    }
    select(columns) {
      if (this.action !== "insert" && this.action !== "update") {
        this.action = "select";
      }
      return this;
    }
    insert(values) {
      this.action = "insert";
      this.insertData = values;
      return this;
    }
    update(values) {
      this.action = "update";
      this.updateData = values;
      return this;
    }
    delete() {
      this.action = "delete";
      return this;
    }
    eq(field, value) {
      this.filters.push({ field, value });
      return this;
    }
    order(column, options) {
      this.orderByField = column;
      this.orderAscending = options?.ascending ?? true;
      return this;
    }
    maybeSingle() {
      this.isSingle = true;
      return this;
    }
    single() {
      this.isSingle = true;
      return this;
    }
    async then(onfulfilled) {
      try {
        const res = await this.execute();
        if (onfulfilled) return onfulfilled(res);
        return res;
      } catch (err) {
        if (onfulfilled) return onfulfilled({ data: null, error: err });
        return { data: null, error: err };
      }
    }
    async execute() {
      const storageKey = `mock-db-${this.tableName}`;
      let data = [];
      const raw = getStorageItem(storageKey);
      if (raw) {
        try {
          data = JSON.parse(raw);
        } catch {
          data = [];
        }
      }
      if (this.action === "select") {
        let filtered = [...data];
        for (const f of this.filters) {
          filtered = filtered.filter((row) => row[f.field] === f.value);
        }
        if (this.orderByField) {
          filtered.sort((a, b) => {
            const valA = a[this.orderByField];
            const valB = b[this.orderByField];
            if (valA == null || valB == null) return 0;
            if (valA < valB) return this.orderAscending ? -1 : 1;
            if (valA > valB) return this.orderAscending ? 1 : -1;
            return 0;
          });
        }
        if (this.isSingle) {
          return { data: filtered[0] || null, error: null };
        }
        return { data: filtered, error: null };
      }
      if (this.action === "insert") {
        const rowsToInsert = Array.isArray(this.insertData) ? this.insertData : [this.insertData];
        const newRows = rowsToInsert.map((row) => {
          const id = row.id || "row-" + Math.random().toString(36).substring(2, 11);
          return {
            id,
            created_at: (/* @__PURE__ */ new Date()).toISOString(),
            updated_at: (/* @__PURE__ */ new Date()).toISOString(),
            ...row
          };
        });
        data.push(...newRows);
        setStorageItem(storageKey, JSON.stringify(data));
        return { data: this.isSingle ? newRows[0] : newRows, error: null };
      }
      if (this.action === "update") {
        let updatedCount = 0;
        const updated = data.map((row) => {
          const matches = this.filters.every((f) => row[f.field] === f.value);
          if (matches) {
            updatedCount++;
            return {
              ...row,
              ...this.updateData,
              updated_at: (/* @__PURE__ */ new Date()).toISOString()
            };
          }
          return row;
        });
        if (updatedCount > 0) {
          setStorageItem(storageKey, JSON.stringify(updated));
        }
        const filtered = updated.filter(
          (row) => this.filters.every((f) => row[f.field] === f.value)
        );
        return { data: this.isSingle ? filtered[0] || null : filtered, error: null };
      }
      if (this.action === "delete") {
        let remaining = [...data];
        if (this.filters.length > 0) {
          remaining = remaining.filter((row) => {
            return !this.filters.every((f) => row[f.field] === f.value);
          });
        } else {
          remaining = [];
        }
        setStorageItem(storageKey, JSON.stringify(remaining));
        return { error: null };
      }
      return { data: null, error: new Error("Unsupported action") };
    }
  }
  const from = (tableName) => {
    return new MockQueryBuilder(tableName);
  };
  return { from };
}
function createSupabaseAdminClient() {
  if (!isSupabaseAdminConfigured()) {
    console.warn(
      "[Supabase Admin] Environment variables missing or placeholder detected. Falling back to local Mock Supabase Admin Client."
    );
    return createMockSupabaseAdminClient();
  }
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    const missing = [
      ...!SUPABASE_URL ? ["SUPABASE_URL"] : [],
      ...!SUPABASE_SERVICE_ROLE_KEY ? ["SUPABASE_SERVICE_ROLE_KEY"] : []
    ];
    const message = `Missing Supabase environment variable(s): ${missing.join(", ")}.`;
    console.error(`[Supabase Admin] ${message}`);
    throw new Error(message);
  }
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      storage: void 0,
      persistSession: false,
      autoRefreshToken: false
    }
  });
}
let _supabaseAdmin;
const supabaseAdmin = new Proxy({}, {
  get(_, prop, receiver) {
    if (!_supabaseAdmin) _supabaseAdmin = createSupabaseAdminClient();
    return Reflect.get(_supabaseAdmin, prop, receiver);
  }
});
async function syncUser() {
  const { userId } = await auth();
  if (!userId) return null;
  try {
    const client = await clerkClient();
    const clerkUser = await client.users.getUser(userId);
    const email = clerkUser.emailAddresses[0]?.emailAddress ?? "";
    const fullName = clerkUser.fullName ?? clerkUser.username ?? email.split("@")[0];
    const imageUrl = clerkUser.imageUrl ?? null;
    const { data: existingUser, error: selectError } = await supabaseAdmin.from("users").select("*").eq("clerk_user_id", userId).maybeSingle();
    if (selectError) {
      console.error("[Auth Server] Error selecting user from db:", selectError);
    }
    if (!existingUser) {
      try {
        const { data: newUser, error: insertError } = await supabaseAdmin.from("users").insert({
          clerk_user_id: userId,
          email,
          full_name: fullName,
          image_url: imageUrl,
          role: "tourist"
        }).select("*").single();
        if (insertError) {
          throw insertError;
        }
        return newUser;
      } catch (err) {
        if (err?.code === "23505" || err?.message?.includes("already exists")) {
          const { data: retriedUser } = await supabaseAdmin.from("users").select("*").eq("clerk_user_id", userId).maybeSingle();
          if (retriedUser) {
            return retriedUser;
          }
        }
        console.error("[Auth Server] Error inserting user to db:", err);
        throw err;
      }
    } else {
      const needsUpdate = existingUser.email !== email || existingUser.full_name !== fullName || existingUser.image_url !== imageUrl;
      if (needsUpdate) {
        const { data: updatedUser, error: updateError } = await supabaseAdmin.from("users").update({
          email,
          full_name: fullName,
          image_url: imageUrl,
          updated_at: (/* @__PURE__ */ new Date()).toISOString()
        }).eq("clerk_user_id", userId).select("*").single();
        if (updateError) {
          console.error("[Auth Server] Error updating user profile in db:", updateError);
          throw updateError;
        }
        return updatedUser;
      }
      return existingUser;
    }
  } catch (err) {
    console.error("[Auth Server] syncUser exception:", err);
    return null;
  }
}
async function getCurrentUser() {
  return await syncUser();
}
async function requireAuth() {
  const { userId } = await auth();
  if (!userId) {
    throw redirect({
      to: "/sign-in/$"
    });
  }
  const user = await getCurrentUser();
  if (!user) {
    throw new Error(
      "Authentication Sync Error: Failed to synchronize your authenticated user profile with the database. This usually happens if your SUPABASE_SERVICE_ROLE_KEY is missing or commented out in your .env file, or if the dev server was not restarted after updating the environment variables."
    );
  }
  return user;
}
async function requireRole(role) {
  const user = await requireAuth();
  if (user.role !== role) {
    throw redirect({
      to: "/"
    });
  }
  return user;
}
const auth_server = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getCurrentUser,
  requireAuth,
  requireRole,
  syncUser
}, Symbol.toStringTag, { value: "Module" }));
export {
  auth_server as a,
  requireRole as r,
  supabaseAdmin as s
};
