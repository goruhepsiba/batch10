import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Loader2, MapPin, Sparkles } from "lucide-react";

import { SearchBar } from "@/components/site/SearchBar";
import { DestinationCard } from "@/components/site/DestinationCard";
import { searchDestinations } from "@/lib/destinations";
import { geocodePlace, placeSlug, type GeoResult } from "@/lib/geocode";

const SearchSchema = z.object({ q: z.string().catch("") });

export const Route = createFileRoute("/search")({
  validateSearch: SearchSchema,
  head: ({ match }) => ({
    meta: [
      { title: `Search${match.search.q ? ` — ${match.search.q}` : ""} · HeritageVerse` },
      { name: "description", content: "Search heritage destinations worldwide." },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const curated = searchDestinations(q);

  const [geo, setGeo] = useState<GeoResult[]>([]);
  const [geoLoading, setGeoLoading] = useState(false);

  useEffect(() => {
    if (!q.trim()) {
      setGeo([]);
      return;
    }
    let cancelled = false;
    setGeoLoading(true);
    geocodePlace(q, 8)
      .then((r) => {
        if (!cancelled) setGeo(r);
      })
      .finally(() => {
        if (!cancelled) setGeoLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [q]);

  return (
    <section className="container-prose pt-12 pb-20">
      <p className="text-xs uppercase tracking-[0.24em] text-amber">Search</p>
      <h1 className="font-display text-4xl md:text-5xl mt-2">
        {q ? (
          <>
            Results for <span className="italic">"{q}"</span>
          </>
        ) : (
          "Explore every destination"
        )}
      </h1>

      <div className="mt-8 max-w-2xl">
        <SearchBar size="md" />
      </div>

      {/* Curated */}
      {curated.length > 0 && (
        <div className="mt-12">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.24em] text-amber">Curated heritage sites</p>
            <p className="text-xs text-muted-foreground">
              {q.trim()
                ? `${curated.length} match${curated.length === 1 ? "" : "es"}`
                : `${curated.length} hand-picked`}
            </p>
          </div>
          <div className="mt-5 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {curated.map((d) => (
              <DestinationCard key={d.slug} d={d} />
            ))}
          </div>
        </div>
      )}

      {/* Geocoded — any place on Earth */}
      {q.trim() && (
        <div className="mt-16">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber" />
              <p className="text-xs uppercase tracking-[0.24em] text-amber">Any place on Earth</p>
            </div>
            {geoLoading && <Loader2 className="h-4 w-4 animate-spin text-amber" />}
          </div>
          <p className="mt-1 text-muted-foreground text-sm">
            We'll generate a rich heritage profile for any city, monument or landmark you pick.
          </p>

          {!geoLoading && geo.length === 0 && (
            <div className="mt-8 rounded-2xl border border-border/60 bg-card p-8 text-center">
              <p className="font-display text-xl">No worldwide match found.</p>
              <p className="text-muted-foreground text-sm mt-1">
                Try a different spelling or a broader name.
              </p>
            </div>
          )}

          {geo.length > 0 && (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {geo.map((g) => (
                <Link
                  key={g.id}
                  to="/place/$name"
                  params={{ name: g.name }}
                  search={{
                    lat: g.latitude,
                    lng: g.longitude,
                    country: g.country,
                    admin: g.admin1 ?? "",
                  }}
                  className="group rounded-2xl glass-card p-5 hover:shadow-elegant transition-all duration-500 hover:-translate-y-1"
                >
                  <p className="font-display text-2xl leading-tight group-hover:text-amber transition">
                    {g.name}
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    {[g.admin1, g.country].filter(Boolean).join(", ")}
                  </p>
                  <p className="mt-4 text-xs text-amber uppercase tracking-[0.2em]">
                    Open profile →
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
