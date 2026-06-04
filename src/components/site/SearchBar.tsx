import { useNavigate } from "@tanstack/react-router";
import { Search, Clock, Sparkles, MapPin, X, ArrowUpRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { destinations } from "@/lib/destinations";
import { geocodePlace, type GeoResult } from "@/lib/geocode";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";

export function SearchBar({ size = "lg" }: { size?: "lg" | "md" }) {
  const [q, setQ] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<typeof destinations>([]);
  const [geoSuggestions, setGeoSuggestions] = useState<GeoResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const { user } = useAuth();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const big = size === "lg";

  // Load history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("search_history");
    if (saved) {
      try {
        setHistory(JSON.parse(saved).slice(0, 5));
      } catch {
        setHistory([]);
      }
    }
  }, []);

  // Save history helper
  const saveSearchToHistory = async (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    
    // Update local history
    const filtered = history.filter((h) => h.toLowerCase() !== trimmed.toLowerCase());
    const updated = [trimmed, ...filtered].slice(0, 5);
    setHistory(updated);
    localStorage.setItem("search_history", JSON.stringify(updated));

    // Optional: save to Supabase search_history table
    try {
      await supabase.from("search_history").insert({
        user_id: user?.id || null,
        query: trimmed,
      });
    } catch (e) {
      console.warn("Could not sync search history to database:", e);
    }
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  // Debounced geocoding & autocomplete suggestions
  useEffect(() => {
    const trimmed = q.trim();
    if (!trimmed) {
      setSuggestions([]);
      setGeoSuggestions([]);
      return;
    }

    // 1. Curated suggestions (Fuzzy match)
    const matchSingular = trimmed.endsWith("s") ? trimmed.slice(0, -1) : trimmed;
    const curatedMatches = destinations.filter((d) =>
      [d.name, d.city, d.country, d.category].some((f) =>
        f.toLowerCase().includes(trimmed.toLowerCase()) || f.toLowerCase().includes(matchSingular.toLowerCase())
      )
    ).slice(0, 3);
    setSuggestions(curatedMatches);

    // 2. Geocoding autocomplete (with 400ms debounce)
    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const results = await geocodePlace(trimmed, 4);
        setGeoSuggestions(results);
      } catch (err) {
        console.error("Autocomplete geocode failed", err);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [q]);

  const handleSearchSubmit = (searchQuery: string) => {
    saveSearchToHistory(searchQuery);
    setIsOpen(false);
    navigate({ to: "/search", search: { q: searchQuery } });
  };

  const clearHistory = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHistory([]);
    localStorage.removeItem("search_history");
  };

  const popular = ["Hyderabad", "Kyoto", "Taj Mahal", "Hampi", "Petra"];

  return (
    <div className="relative w-full" ref={containerRef}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearchSubmit(q);
        }}
        className={
          "glass-card rounded-full flex items-center gap-2 border border-border/80 focus-within:border-amber/50 focus-within:shadow-soft transition-all " +
          (big ? "p-2 pl-6 text-base" : "p-1.5 pl-4 text-sm")
        }
      >
        <Search className={big ? "h-5 w-5 text-amber" : "h-4 w-4 text-amber"} strokeWidth={1.8} />
        <input
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Where would you like to explore? — try Birla Mandir, Kyoto…"
          className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground/80 text-foreground"
          aria-label="Search destinations"
        />
        {q && (
          <button
            type="button"
            onClick={() => {
              setQ("");
              setIsOpen(true);
            }}
            className="p-1 text-muted-foreground/80 hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        <button
          type="submit"
          className={
            "rounded-full bg-[var(--gradient-amber)] text-primary-foreground font-medium hover:opacity-95 transition shadow-soft cursor-pointer " +
            (big ? "h-12 px-6" : "h-9 px-4")
          }
        >
          Search
        </button>
      </form>

      {/* DROPDOWN OPTIONS */}
      {isOpen && (
        <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-card border border-border/70 rounded-2xl shadow-elegant z-50 overflow-hidden animate-in fade-in-50 slide-in-from-top-2 duration-150">
          <div className="p-4 space-y-4 max-h-[420px] overflow-y-auto">
            
            {/* If query is empty: Show history & popular */}
            {!q.trim() && (
              <>
                {history.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.16em] text-muted-foreground mb-2">
                      <span className="flex items-center gap-1.5"><Clock className="h-3 w-3" /> Recent Searches</span>
                      <button type="button" onClick={clearHistory} className="hover:text-amber transition-colors">Clear</button>
                    </div>
                    <div className="space-y-1">
                      {history.map((h, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => {
                            setQ(h);
                            handleSearchSubmit(h);
                          }}
                          className="flex items-center justify-between w-full text-left text-sm text-foreground/90 py-2 px-3 rounded-lg hover:bg-accent/40 transition-colors"
                        >
                          <span className="flex items-center gap-2"><Clock className="h-3.5 w-3.5 text-muted-foreground/80" /> {h}</span>
                          <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 text-muted-foreground" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground mb-2 flex items-center gap-1.5">
                    <Sparkles className="h-3 w-3 text-amber" /> Popular destinations
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {popular.map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => {
                          setQ(p);
                          handleSearchSubmit(p);
                        }}
                        className="text-xs font-medium rounded-full bg-background border border-border/80 hover:border-amber/40 hover:bg-amber/10 px-3 py-1.5 transition-all text-foreground/95"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* If query is NOT empty: Show curated suggestions & geocoded search */}
            {q.trim() && (
              <>
                {suggestions.length > 0 && (
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground mb-2 flex items-center gap-1.5">
                      <Sparkles className="h-3 w-3 text-amber" /> Hand-picked places
                    </p>
                    <div className="space-y-1">
                      {suggestions.map((d) => (
                        <button
                          key={d.slug}
                          type="button"
                          onClick={() => {
                            saveSearchToHistory(d.name);
                            setIsOpen(false);
                            navigate({ to: "/destination/$slug", params: { slug: d.slug } });
                          }}
                          className="flex items-center justify-between w-full text-left py-2 px-3 rounded-lg hover:bg-accent/40 transition"
                        >
                          <div>
                            <p className="text-sm font-medium text-foreground">{d.name}</p>
                            <p className="text-xs text-muted-foreground">{d.city}, {d.country}</p>
                          </div>
                          <span className="text-xs font-medium text-amber uppercase tracking-wider">{d.category}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground mb-2 flex items-center gap-1.5">
                    <MapPin className="h-3 w-3 text-amber" /> Worldwide matches
                  </p>
                  <div className="space-y-1">
                    {loading && geoSuggestions.length === 0 && (
                      <p className="text-xs text-muted-foreground px-3 py-2 animate-pulse">Searching global registry…</p>
                    )}
                    {geoSuggestions.map((g) => (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => {
                          saveSearchToHistory(g.name);
                          setIsOpen(false);
                          navigate({
                            to: "/place/$name",
                            params: { name: encodeURIComponent(g.name) },
                            search: { lat: g.latitude, lng: g.longitude, country: g.country, admin: g.admin1 ?? "" },
                          });
                        }}
                        className="flex items-center justify-between w-full text-left py-2 px-3 rounded-lg hover:bg-accent/40 transition"
                      >
                        <div>
                          <p className="text-sm font-medium text-foreground">{g.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {[g.admin1, g.country].filter(Boolean).join(", ")}
                          </p>
                        </div>
                        <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground/80" />
                      </button>
                    ))}
                    {!loading && geoSuggestions.length === 0 && (
                      <p className="text-xs text-muted-foreground px-3 py-2">No other locations found. Press enter to search.</p>
                    )}
                  </div>
                </div>
              </>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
