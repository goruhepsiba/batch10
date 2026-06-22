import { createFileRoute, Link } from "@tanstack/react-router";
import { checkAuth } from "@/lib/auth.fns";
import { useAuth } from "@/hooks/use-auth";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Heart,
  Compass,
  Calendar,
  Sparkles,
  Search,
  ArrowRight,
  Loader2,
  Bookmark,
} from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: async () => {
    await checkAuth();
  },
  head: () => ({
    meta: [
      { title: "Dashboard · HeritageVerse" },
      { name: "description", content: "Your travel statistics, itineraries, and collections." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ favorites: 0, trips: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    let active = true;
    (async () => {
      try {
        const [{ count: favsCount }, { count: tripsCount }] = await Promise.all([
          supabase.from("favorites").select("*", { count: "exact", head: true }),
          supabase.from("saved_trips").select("*", { count: "exact", head: true }),
        ]);
        if (active) {
          setStats({
            favorites: favsCount || 0,
            trips: tripsCount || 0,
          });
        }
      } catch (err) {
        console.error("Could not fetch user stats:", err);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [user]);

  if (!user) return null;

  return (
    <section className="container-prose pt-12 pb-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.05),transparent_50%)] pointer-events-none -z-10" />
      
      <p className="text-xs uppercase tracking-[0.24em] text-amber font-semibold">Travel Center</p>
      <h1 className="font-display text-4xl md:text-5xl mt-2 font-bold">
        Welcome, {user.fullName || "Traveler"}!
      </h1>
      <p className="mt-2 text-muted-foreground">Manage your saved destinations and AI trips.</p>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 mt-8">
        <div className="rounded-2xl glass-card p-6 shadow-soft hover:shadow-elegant transition duration-300 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition duration-300">
            <Heart className="h-24 w-24 text-amber" />
          </div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Favorite Places</p>
          {loading ? (
            <Loader2 className="h-6 w-6 animate-spin text-amber mt-2" />
          ) : (
            <p className="text-4xl font-display font-bold text-amber mt-2">{stats.favorites}</p>
          )}
          <Link
            to="/favorites"
            className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-amber hover:underline underline-offset-4"
          >
            Manage favorites <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="rounded-2xl glass-card p-6 shadow-soft hover:shadow-elegant transition duration-300 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition duration-300">
            <Compass className="h-24 w-24 text-amber" />
          </div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Saved Itineraries</p>
          {loading ? (
            <Loader2 className="h-6 w-6 animate-spin text-amber mt-2" />
          ) : (
            <p className="text-4xl font-display font-bold text-amber mt-2">{stats.trips}</p>
          )}
          <Link
            to="/favorites"
            className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-amber hover:underline underline-offset-4"
          >
            View itineraries <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <h2 className="font-display text-2xl font-bold mt-16">Quick Actions</h2>
      <div className="grid gap-4 sm:grid-cols-2 mt-6">
        <Link
          to="/planner"
          className="rounded-2xl border border-border/60 bg-card p-6 hover:shadow-soft hover:border-amber/40 transition group flex flex-col justify-between"
        >
          <div>
            <span className="grid h-10 w-10 place-items-center rounded-full bg-amber/10 text-amber">
              <Sparkles className="h-5 w-5" />
            </span>
            <p className="font-display text-lg font-semibold mt-4 group-hover:text-amber transition">
              AI Trip Planner
            </p>
            <p className="text-sm text-muted-foreground mt-1 font-light leading-relaxed">
              Plan custom day-by-day routes and generate lists of landmarks instantly with AI.
            </p>
          </div>
          <span className="mt-6 inline-flex items-center gap-1 text-xs font-semibold text-amber">
            Launch Planner <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition" />
          </span>
        </Link>

        <Link
          to="/search"
          search={{ q: "" }}
          className="rounded-2xl border border-border/60 bg-card p-6 hover:shadow-soft hover:border-amber/40 transition group flex flex-col justify-between"
        >
          <div>
            <span className="grid h-10 w-10 place-items-center rounded-full bg-amber/10 text-amber">
              <Search className="h-5 w-5" />
            </span>
            <p className="font-display text-lg font-semibold mt-4 group-hover:text-amber transition">
              Explore Destinations
            </p>
            <p className="text-sm text-muted-foreground mt-1 font-light leading-relaxed">
              Find historic monuments, cities, and cultural highlights with 360° views.
            </p>
          </div>
          <span className="mt-6 inline-flex items-center gap-1 text-xs font-semibold text-amber">
            Search map <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition" />
          </span>
        </Link>
      </div>
    </section>
  );
}
