import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";
import * as fs from "node:fs";
import * as path from "node:path";
import process from "node:process";

const MOCK_DB_FILE = path.join(process.cwd(), ".tanstack", "mock-db.json");

export function isSupabaseAdminConfigured(): boolean {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) return false;
  if (
    SUPABASE_URL === "https://your-project.supabase.co" ||
    SUPABASE_SERVICE_ROLE_KEY === "your-service-role-key"
  ) {
    return false;
  }
  return true;
}

function getStorageItem(key: string): string | null {
  try {
    if (!fs.existsSync(MOCK_DB_FILE)) return null;
    const db = JSON.parse(fs.readFileSync(MOCK_DB_FILE, "utf8"));
    return db[key] || null;
  } catch {
    return null;
  }
}

function setStorageItem(key: string, val: string): void {
  try {
    const dir = path.dirname(MOCK_DB_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const db = fs.existsSync(MOCK_DB_FILE)
      ? JSON.parse(fs.readFileSync(MOCK_DB_FILE, "utf8"))
      : {};
    db[key] = val;
    fs.writeFileSync(MOCK_DB_FILE, JSON.stringify(db, null, 2), "utf8");
  } catch (err) {
    console.error("Failed to write to mock database file:", err);
  }
}

function createMockSupabaseAdminClient() {
  class MockQueryBuilder {
    private tableName: string;
    private filters: Array<{ field: string; value: any }> = [];
    private orderByField: string | null = null;
    private orderAscending = true;
    private action: "select" | "insert" | "delete" | "update" = "select";
    private insertData: any = null;
    private updateData: any = null;
    private isSingle = false;

    constructor(tableName: string) {
      this.tableName = tableName;
    }

    select(columns?: string) {
      if (this.action !== "insert" && this.action !== "update") {
        this.action = "select";
      }
      return this;
    }

    insert(values: any) {
      this.action = "insert";
      this.insertData = values;
      return this;
    }

    update(values: any) {
      this.action = "update";
      this.updateData = values;
      return this;
    }

    delete() {
      this.action = "delete";
      return this;
    }

    eq(field: string, value: any) {
      this.filters.push({ field, value });
      return this;
    }

    order(column: string, options?: { ascending: boolean }) {
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

    async then(onfulfilled?: (value: any) => any) {
      try {
        const res = await this.execute();
        if (onfulfilled) return onfulfilled(res);
        return res;
      } catch (err) {
        if (onfulfilled) return onfulfilled({ data: null, error: err });
        return { data: null, error: err };
      }
    }

    private async execute() {
      const storageKey = `mock-db-${this.tableName}`;
      let data: any[] = [];
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
            const valA = a[this.orderByField!];
            const valB = b[this.orderByField!];
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
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            ...row,
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
              updated_at: new Date().toISOString(),
            };
          }
          return row;
        });
        if (updatedCount > 0) {
          setStorageItem(storageKey, JSON.stringify(updated));
        }
        const filtered = updated.filter((row) =>
          this.filters.every((f) => row[f.field] === f.value)
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

  const from = (tableName: string) => {
    return new MockQueryBuilder(tableName);
  };

  return { from };
}

function createSupabaseAdminClient() {
  if (!isSupabaseAdminConfigured()) {
    console.warn(
      "[Supabase Admin] Environment variables missing or placeholder detected. Falling back to local Mock Supabase Admin Client."
    );
    return createMockSupabaseAdminClient() as any;
  }

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    const missing = [
      ...(!SUPABASE_URL ? ["SUPABASE_URL"] : []),
      ...(!SUPABASE_SERVICE_ROLE_KEY ? ["SUPABASE_SERVICE_ROLE_KEY"] : []),
    ];
    const message = `Missing Supabase environment variable(s): ${missing.join(", ")}.`;
    console.error(`[Supabase Admin] ${message}`);
    throw new Error(message);
  }

  return createClient<Database>(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      storage: undefined,
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

let _supabaseAdmin: ReturnType<typeof createSupabaseAdminClient> | undefined;

export const supabaseAdmin = new Proxy({} as ReturnType<typeof createSupabaseAdminClient>, {
  get(_, prop, receiver) {
    if (!_supabaseAdmin) _supabaseAdmin = createSupabaseAdminClient();
    return Reflect.get(_supabaseAdmin, prop, receiver);
  },
});
