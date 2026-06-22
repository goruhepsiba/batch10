import { createFileRoute } from "@tanstack/react-router";
import { checkAuth } from "@/lib/auth.fns";
import { useAuth } from "@/hooks/use-auth";
import { User, Mail, Shield, Calendar, IdCard } from "lucide-react";

export const Route = createFileRoute("/profile")({
  beforeLoad: async () => {
    await checkAuth();
  },
  head: () => ({
    meta: [
      { title: "My Profile · HeritageVerse" },
      { name: "description", content: "View your user profile and authorization roles." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <section className="container-prose pt-12 pb-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.05),transparent_50%)] pointer-events-none -z-10" />

      <p className="text-xs uppercase tracking-[0.24em] text-amber font-semibold">Account settings</p>
      <h1 className="font-display text-4xl md:text-5xl mt-2 font-bold">Personal Profile</h1>
      <p className="mt-2 text-muted-foreground">Manage your synced user account credentials.</p>

      <div className="mt-10 rounded-2xl border border-border/60 bg-card/60 backdrop-blur overflow-hidden shadow-soft">
        <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 border-b border-border/60 bg-muted/30">
          {user.imageUrl ? (
            <img
              src={user.imageUrl}
              alt={user.fullName}
              className="h-20 w-20 rounded-full border border-border/80 object-cover shadow-sm"
            />
          ) : (
            <div className="h-20 w-20 rounded-full border border-border/80 bg-background flex items-center justify-center shadow-sm">
              <User className="h-8 w-8 text-amber" />
            </div>
          )}
          <div className="text-center sm:text-left">
            <h2 className="font-display text-2xl font-bold">{user.fullName || "Traveler"}</h2>
            <p className="text-sm text-muted-foreground mt-0.5">{user.email}</p>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            

            <div className="flex items-start gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-amber/10 text-amber mt-0.5">
                <Mail className="h-4.5 w-4.5" />
              </span>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Email Address</p>
                <p className="text-sm font-semibold mt-1">{user.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-amber/10 text-amber mt-0.5">
                <Shield className="h-4.5 w-4.5" />
              </span>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Authorization Role</p>
                <p className="text-sm font-semibold mt-1 capitalize flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block" />
                  {user.role}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-amber/10 text-amber mt-0.5">
                <Calendar className="h-4.5 w-4.5" />
              </span>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Account Sync Status</p>
                <p className="text-sm font-semibold mt-1 text-emerald-600 dark:text-emerald-400">
                  Active & Synced
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
