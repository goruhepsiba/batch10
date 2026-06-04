import { ExternalLink, Map, Rotate3D, Maximize2 } from "lucide-react";
import { useMemo, useState } from "react";

type VirtualTourFrameProps = {
  title: string;
  lat?: number;
  lng?: number;
  query: string;
  mapEmbed?: string;
};

const buildSearch = (query: string) => encodeURIComponent(query.trim());

export function VirtualTourFrame({ title, lat, lng, query, mapEmbed }: VirtualTourFrameProps) {
  const [mode, setMode] = useState<"street" | "map">("street");
  const hasCoords = Number.isFinite(lat) && Number.isFinite(lng);

  const links = useMemo(() => {
    const streetEmbed = hasCoords
      ? `https://www.google.com/maps?layer=c&cbll=${lat},${lng}&cbp=12,0,0,0,0&output=svembed`
      : `https://www.google.com/maps?q=${buildSearch(query)}&layer=c&output=svembed`;

    const streetOpen = hasCoords
      ? `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${lat},${lng}`
      : `https://www.google.com/maps/search/?api=1&query=${buildSearch(query)}`;

    const map = mapEmbed ?? `https://www.google.com/maps?q=${buildSearch(query)}&output=embed`;

    return { streetEmbed, streetOpen, map };
  }, [hasCoords, lat, lng, mapEmbed, query]);

  const src = mode === "street" ? links.streetEmbed : links.map;

  return (
    <div className="mt-5 overflow-hidden rounded-lg border border-border/70 bg-card shadow-elegant">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 bg-background/70 px-4 py-3">
        <div className="flex items-center gap-2 text-sm font-medium">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-primary/10 text-primary">
            {mode === "street" ? <Rotate3D className="h-4 w-4" /> : <Map className="h-4 w-4" />}
          </span>
          <span>{mode === "street" ? "Street View tour" : "Location map"}</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="grid grid-cols-2 overflow-hidden rounded-md border border-border bg-background text-xs">
            <button
              type="button"
              onClick={() => setMode("street")}
              className={`inline-flex h-8 items-center justify-center gap-1.5 px-3 transition-colors ${mode === "street" ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}
            >
              <Rotate3D className="h-3.5 w-3.5" />
              360
            </button>
            <button
              type="button"
              onClick={() => setMode("map")}
              className={`inline-flex h-8 items-center justify-center gap-1.5 px-3 transition-colors ${mode === "map" ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}
            >
              <Map className="h-3.5 w-3.5" />
              Map
            </button>
          </div>

          <a
            href={mode === "street" ? links.streetOpen : `https://www.google.com/maps/search/?api=1&query=${buildSearch(query)}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-background px-3 text-xs hover:bg-accent"
          >
            <Maximize2 className="h-3.5 w-3.5" />
            Open
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>

      <div className="relative aspect-[16/9] bg-muted">
        <iframe
          title={`${title} ${mode === "street" ? "street view" : "map"}`}
          src={src}
          className="h-full w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-background/70 px-4 py-3 text-xs text-muted-foreground">
        <span>Drag inside the frame to look around.</span>
        <span>Some remote sites may only have nearby Street View coverage.</span>
      </div>
    </div>
  );
}
