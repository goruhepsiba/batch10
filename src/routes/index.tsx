import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Globe2, Landmark, Map, Sparkles } from "lucide-react";

import heroImg from "@/assets/hero-heritage.jpg";
import { destinations } from "@/lib/destinations";
import { DestinationCard } from "@/components/site/DestinationCard";
import { SearchBar } from "@/components/site/SearchBar";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HeritageVerse — Discover the world's heritage" },
      {
        name: "description",
        content:
          "Search forts, palaces, temples and UNESCO sites. Read rich guides, view hotels, weather and 360° tours. Generate AI itineraries in seconds.",
      },
      { property: "og:title", content: "HeritageVerse — Discover the world's heritage" },
      {
        property: "og:description",
        content: "AI-powered heritage tourism: search, plan, and explore.",
      },
    ],
  }),
  component: Home,
});

const collections: { label: string; icon: typeof Landmark }[] = [
  { label: "Forts", icon: Landmark },
  { label: "Palaces", icon: Landmark },
  { label: "Temples", icon: Landmark },
  { label: "Museums", icon: Landmark },
  { label: "UNESCO Sites", icon: Globe2 },
  { label: "Monuments", icon: Landmark },
  { label: "Natural Wonders", icon: Map },
];

function Home() {
  const featured = destinations.slice(0, 6);

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src={heroImg}
            alt="Ancient heritage temple at golden hour"
            width={1920}
            height={1080}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        </div>

        <div className="container-prose pt-28 pb-32 md:pt-40 md:pb-44 text-parchment">
          <p className="text-xs md:text-sm uppercase tracking-[0.32em] text-amber/90">
            AI-powered heritage tourism
          </p>
          <h1 className="mt-5 font-display text-5xl md:text-7xl leading-[1.02] max-w-3xl text-parchment">
            Walk through time.<br />
            <span className="italic text-gradient-amber">Plan it in seconds.</span>
          </h1>
          <p className="mt-6 max-w-xl text-parchment/85 text-lg">
            Search any city, monument or country — discover heritage sites, hotels, weather, 360°
            tours and AI-crafted itineraries, all in one place.
          </p>

          <div className="mt-10 max-w-2xl">
            <SearchBar />
            <div className="mt-4 flex flex-wrap gap-2 text-sm text-parchment/70">
              <span className="opacity-70">Popular —</span>
              {["Hyderabad", "Taj Mahal", "Kyoto", "Hampi", "Petra"].map((p) => (
                <Link
                  key={p}
                  to="/search"
                  search={{ q: p }}
                  className="hover:text-amber transition-colors underline-offset-4 hover:underline"
                >
                  {p}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COLLECTIONS */}
      <section className="container-prose -mt-12 relative z-10">
        <div className="glass-card rounded-2xl p-4 md:p-6 flex flex-wrap gap-2 md:gap-3 justify-center">
          {collections.map(({ label, icon: Icon }) => (
            <Link
              key={label}
              to="/search"
              search={{ q: label }}
              className="inline-flex items-center gap-2 rounded-full bg-background/60 hover:bg-amber/15 transition-colors px-4 py-2 text-sm border border-border/60"
            >
              <Icon className="h-4 w-4 text-amber" strokeWidth={1.7} />
              {label}
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="container-prose mt-24">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-amber">Featured destinations</p>
            <h2 className="font-display text-4xl md:text-5xl mt-2">
              Where heritage <span className="italic">comes alive</span>
            </h2>
          </div>
          <Link
            to="/search"
            search={{ q: "" }}
            className="hidden md:inline-flex items-center gap-1 text-sm text-foreground hover:text-amber transition-colors"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 md:gap-7 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((d, i) => (
            <DestinationCard key={d.slug} d={d} eager={i < 3} />
          ))}
        </div>
      </section>

      {/* WHY */}
      <section className="container-prose mt-28">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-amber">Why HeritageVerse</p>
            <h2 className="font-display text-4xl md:text-5xl mt-2 leading-[1.05]">
              A travel guide<br /><span className="italic">written for the curious.</span>
            </h2>
            <p className="mt-5 text-muted-foreground max-w-md">
              Every destination is built like an editorial dossier — history, architecture,
              timeline, hotels, weather, maps, and a 360° street view. Pair it with our AI
              planner and you have a trip ready in minutes.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Sparkles, title: "AI itineraries", body: "Tailored day-by-day plans with real places and food." },
              { icon: Globe2, title: "Global heritage", body: "From Charminar to Angkor Wat — UNESCO and beyond." },
              { icon: Map, title: "Maps & 360°", body: "Walk locations virtually before you arrive." },
              { icon: Landmark, title: "Rich guides", body: "Architecture, timelines and cultural context." },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-2xl border border-border/60 bg-card p-5">
                <Icon className="h-5 w-5 text-amber" strokeWidth={1.7} />
                <h3 className="font-display text-xl mt-3">{title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-prose mt-28">
        <div
          className="relative overflow-hidden rounded-3xl p-10 md:p-16 text-parchment"
          style={{ background: "var(--gradient-amber)" }}
        >
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl md:text-5xl leading-[1.05]">
              Tell us your dream trip.<br />
              <span className="italic">We'll plan the rest.</span>
            </h2>
            <p className="mt-4 text-parchment/90">
              Budget, days, interests — our AI concierge crafts a heritage itinerary in seconds.
            </p>
            <Link
              to="/planner"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-ink text-parchment px-6 py-3 text-sm font-medium hover:opacity-90"
              style={{ backgroundColor: "var(--ink)" }}
            >
              Open AI Planner <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
