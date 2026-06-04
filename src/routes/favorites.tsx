import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Heart, MapPin, Trash2, BookMarked, Calendar, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { findDestination } from "@/lib/destinations";

interface Favorite {
  id: string;
  kind: "curated" | "place";
  ref: string;
  name: string;
  country: string | null;
  lat: number | null;
  lng: number | null;
  created_at: string;
}

interface SavedTrip {
  id: string;
  destination: string;
  days: number;
  budget: string;
  itinerary: { summary?: string };
  created_at: string;
}

export const Route = createFileRoute("/favorites")({
  head: () => ({
    meta: [
      { title: "My favorites · HeritageVerse" },
      { name: "description", content: "Your saved heritage places and AI-generated itineraries." },
    ],
  }),
  component: FavoritesPage,
});

function FavoritesPage() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [trips, setTrips] = useState<SavedTrip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) { navigate({ to: "/auth", replace: true }); return; }
    let cancelled = false;
    (async () => {
      setLoading(true);
      const [{ data: favs }, { data: tps }] = await Promise.all([
        supabase.from("favorites").select("*").order("created_at", { ascending: false }),
        supabase.from("saved_trips").select("id,destination,days,budget,itinerary,created_at").order("created_at", { ascending: false }),
      ]);
      if (cancelled) return;
      setFavorites((favs ?? []) as Favorite[]);
      setTrips((tps ?? []) as SavedTrip[]);
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, [user, authLoading, navigate]);

  const removeFav = async (id: string) => {
    const prev = favorites;
    setFavorites(favorites.filter((f) => f.id !== id));
    const { error } = await supabase.from("favorites").delete().eq("id", id);
    if (error) { setFavorites(prev); toast.error(error.message); }
    else toast.success("Removed");
  };

  const removeTrip = async (id: string) => {
    const prev = trips;
    setTrips(trips.filter((t) => t.id !== id));
    const { error } = await supabase.from("saved_trips").delete().eq("id", id);
    if (error) { setTrips(prev); toast.error(error.message); }
    else toast.success("Trip removed");
  };

  if (authLoading || !user) {
    return (
      <section className="container-prose py-24 text-center">
        <Loader2 className="mx-auto h-6 w-6 animate-spin text-amber" />
      </section>
    );
  }

  return (
    <section className="container-prose pt-12 pb-20">
      <p className="text-xs uppercase tracking-[0.24em] text-amber">My collection</p>
      <h1 className="font-display text-4xl md:text-5xl mt-2">Saved places & itineraries</h1>
      <p className="mt-2 text-muted-foreground">Welcome back, {user.email}.</p>

      {/* Favorites */}
      <div className="mt-12">
        <h2 className="font-display text-2xl flex items-center gap-2">
          <Heart className="h-5 w-5 text-amber fill-amber" /> Favorite places
        </h2>
        {loading ? (
          <p className="mt-4 text-muted-foreground">Loading…</p>
        ) : favorites.length === 0 ? (
          <div className="mt-5 rounded-2xl border border-border/60 bg-card p-8 text-center">
            <p className="text-muted-foreground">No favorites yet. Tap the heart on any place to save it here.</p>
          </div>
        ) : (
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {favorites.map((f) => {
              const curated = f.kind === "curated" ? findDestination(f.ref) : null;
              const href = curated
                ? { to: "/destination/$slug" as const, params: { slug: f.ref } }
                : {
                    to: "/place/$name" as const,
                    params: { name: encodeURIComponent(f.name) },
                    search: { lat: f.lat ?? 0, lng: f.lng ?? 0, country: f.country ?? "", admin: "" },
                  };
              return (
                <div key={f.id} className="group relative rounded-2xl border border-border/60 bg-card overflow-hidden hover:shadow-soft transition">
                  {curated && (
                    <img src={curated.hero} alt={curated.name} className="h-32 w-full object-cover" />
                  )}
                  <div className="p-5">
                    <Link {...href} className="block">
                      <p className="font-display text-xl group-hover:text-amber transition">{f.name}</p>
                      <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" />{f.country ?? f.kind}
                      </p>
                    </Link>
                    <button
                      onClick={() => removeFav(f.id)}
                      className="mt-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive transition"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Saved Trips */}
      <div className="mt-16">
        <h2 className="font-display text-2xl flex items-center gap-2">
          <BookMarked className="h-5 w-5 text-amber" /> Saved AI itineraries
        </h2>
        {loading ? (
          <p className="mt-4 text-muted-foreground">Loading…</p>
        ) : trips.length === 0 ? (
          <div className="mt-5 rounded-2xl border border-border/60 bg-card p-8 text-center">
            <p className="text-muted-foreground">
              No saved itineraries yet. Generate one in the{" "}
              <Link to="/planner" className="text-amber underline underline-offset-4">AI Planner</Link>.
            </p>
          </div>
        ) : (
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {trips.map((t) => (
              <div key={t.id} className="rounded-2xl border border-border/60 bg-card p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-xl leading-tight">{t.destination}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-amber flex items-center gap-1.5">
                      <Calendar className="h-3 w-3" /> {t.days} days · {t.budget}
                    </p>
                  </div>
                  <button
                    onClick={() => removeTrip(t.id)}
                    aria-label="Remove trip"
                    className="text-muted-foreground hover:text-destructive transition"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                {t.itinerary?.summary && (
                  <p className="mt-3 text-sm text-foreground/80 line-clamp-4">{t.itinerary.summary}</p>
                )}
                <p className="mt-3 text-xs text-muted-foreground">
                  Saved {new Date(t.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
