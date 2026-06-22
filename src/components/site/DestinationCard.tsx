import { Link } from "@tanstack/react-router";
import { MapPin, Star } from "lucide-react";
import type { Destination } from "@/lib/destinations";

export function DestinationCard({ d, eager = false }: { d: Destination; eager?: boolean }) {
  return (
    <Link
      to="/destination/$slug"
      params={{ slug: d.slug }}
      className="group block overflow-hidden rounded-2xl glass-card hover:shadow-elegant transition-all duration-500 hover:-translate-y-1.5"
    >
      <div className="aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={d.hero}
          alt={d.name}
          width={1280}
          height={896}
          loading={eager ? "eager" : "lazy"}
          className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] uppercase tracking-[0.18em] text-amber">
            {d.category}
            {d.unesco && " • UNESCO"}
          </span>
          <span className="flex items-center gap-1 text-sm text-foreground">
            <Star className="h-3.5 w-3.5 fill-amber text-amber" /> {d.rating}
          </span>
        </div>
        <h3 className="font-display text-2xl mt-1.5 leading-tight">{d.name}</h3>
        <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" /> {d.city}, {d.country}
        </p>
        <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{d.short}</p>
      </div>
    </Link>
  );
}
