import { createFileRoute, useRouter } from "@tanstack/react-router";
import { createServerFn, useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { checkAdmin } from "@/lib/auth.fns";
import { z } from "zod";
import { ShieldAlert, User, ShieldCheck, Loader2 } from "lucide-react";
import { toast } from "sonner";

// Server Function: Fetch all synced users
const getUsersList = createServerFn({ method: "GET" })
  .handler(async () => {
    const { getUsers } = await import("@/lib/admin.server");
    return await getUsers();
  });

// Server Function: Update a user's role in DB and Clerk publicMetadata
const updateUserRole = createServerFn({ method: "POST" })
  .inputValidator(z.object({ targetUserId: z.string(), role: z.string() }))
  .handler(async ({ data: { targetUserId, role } }) => {
    const { changeUserRole } = await import("@/lib/admin.server");
    return await changeUserRole(targetUserId, role);
  });

export const Route = createFileRoute("/admin")({
  beforeLoad: async () => {
    await checkAdmin();
  },
  head: () => ({
    meta: [
      { title: "Admin Portal · HeritageVerse" },
      { name: "description", content: "Management console for HeritageVerse administrators." },
    ],
  }),
  component: AdminPage,
});

interface UserRecord {
  id: string;
  clerk_user_id: string;
  email: string;
  full_name: string | null;
  image_url: string | null;
  role: string;
  created_at: string;
}

function AdminPage() {
  const router = useRouter();
  const fetchUsers = useServerFn(getUsersList);
  const updateRole = useServerFn(updateUserRole);
  
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetchUsers();
      setUsers(res as UserRecord[]);
    } catch (err: any) {
      toast.error(err.message || "Failed to load user list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRoleToggle = async (targetUserId: string, currentRole: string) => {
    const nextRole = currentRole === "admin" ? "tourist" : "admin";
    if (!confirm(`Are you sure you want to change this user's role to ${nextRole}?`)) return;

    setUpdatingId(targetUserId);
    try {
      await updateRole({ data: { targetUserId, role: nextRole } });
      toast.success("User role updated successfully");
      await loadData();
      router.invalidate();
    } catch (err: any) {
      toast.error(err.message || "Could not update user role");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <section className="container-prose pt-12 pb-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(239,68,68,0.03),transparent_50%)] pointer-events-none -z-10" />

      <p className="text-xs uppercase tracking-[0.24em] text-red-500 font-semibold flex items-center gap-1.5">
        <ShieldAlert className="h-4 w-4" /> Administration
      </p>
      <h1 className="font-display text-4xl md:text-5xl mt-2 font-bold">Admin Console</h1>
      <p className="mt-2 text-muted-foreground">Manage user accounts and roles in the HeritageVerse platform.</p>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-amber" />
        </div>
      ) : (
        <div className="mt-10 border border-border/60 bg-card rounded-2xl overflow-hidden shadow-soft">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-border/60 bg-muted/40 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <th className="p-4">User</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Role</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-muted/10 transition">
                    <td className="p-4 flex items-center gap-3">
                      {u.image_url ? (
                        <img
                          src={u.image_url}
                          alt={u.full_name || ""}
                          className="h-8 w-8 rounded-full border border-border/60 object-cover"
                        />
                      ) : (
                        <span className="grid h-8 w-8 place-items-center rounded-full bg-amber/10 text-amber font-semibold text-xs">
                          {u.full_name?.charAt(0) || "U"}
                        </span>
                      )}
                      <span className="font-medium text-foreground">{u.full_name || "Traveler"}</span>
                    </td>
                    <td className="p-4 text-muted-foreground font-mono text-xs">{u.email}</td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          u.role === "admin"
                            ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                            : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                        }`}
                      >
                        {u.role === "admin" ? (
                          <ShieldCheck className="h-3 w-3" />
                        ) : (
                          <User className="h-3 w-3" />
                        )}
                        {u.role}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleRoleToggle(u.clerk_user_id, u.role)}
                        disabled={updatingId === u.clerk_user_id}
                        className="inline-flex h-8 items-center justify-center rounded-lg border border-border px-3 text-xs font-medium hover:bg-accent transition disabled:opacity-50 cursor-pointer"
                      >
                        {updatingId === u.clerk_user_id ? (
                          <Loader2 className="h-3 w-3 animate-spin text-amber mr-1.5" />
                        ) : null}
                        {u.role === "admin" ? "Demote to Tourist" : "Promote to Admin"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}
