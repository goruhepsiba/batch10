import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useAuth, d as destinations } from "./router-BAKaFseM.mjs";
import { g as geocodePlace } from "./geocode-D87yC2R4.mjs";
import { s as supabase } from "./client-DwzOaH6b.mjs";
import { s as Search, X, y as Clock, z as ArrowUpRight, f as Sparkles, h as MapPin } from "../_libs/lucide-react.mjs";
function SearchBar({ size = "lg" }) {
  const [q, setQ] = reactExports.useState("");
  const [isOpen, setIsOpen] = reactExports.useState(false);
  const [suggestions, setSuggestions] = reactExports.useState([]);
  const [geoSuggestions, setGeoSuggestions] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [history, setHistory] = reactExports.useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();
  const containerRef = reactExports.useRef(null);
  const big = size === "lg";
  reactExports.useEffect(() => {
    const saved = localStorage.getItem("search_history");
    if (saved) {
      try {
        setHistory(JSON.parse(saved).slice(0, 5));
      } catch {
        setHistory([]);
      }
    }
  }, []);
  const saveSearchToHistory = async (query) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    const filtered = history.filter((h) => h.toLowerCase() !== trimmed.toLowerCase());
    const updated = [trimmed, ...filtered].slice(0, 5);
    setHistory(updated);
    localStorage.setItem("search_history", JSON.stringify(updated));
    {
      try {
        await supabase.from("search_history").insert({
          user_id: user?.id || null,
          query: trimmed
        });
      } catch (e) {
        console.warn("Could not sync search history to database:", e);
      }
    }
  };
  reactExports.useEffect(() => {
    const handleOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);
  reactExports.useEffect(() => {
    const trimmed = q.trim();
    if (!trimmed) {
      setSuggestions([]);
      setGeoSuggestions([]);
      return;
    }
    const matchSingular = trimmed.endsWith("s") ? trimmed.slice(0, -1) : trimmed;
    const curatedMatches = destinations.filter(
      (d) => [d.name, d.city, d.country, d.category].some(
        (f) => f.toLowerCase().includes(trimmed.toLowerCase()) || f.toLowerCase().includes(matchSingular.toLowerCase())
      )
    ).slice(0, 3);
    setSuggestions(curatedMatches);
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
  const handleSearchSubmit = (searchQuery) => {
    saveSearchToHistory(searchQuery);
    setIsOpen(false);
    navigate({ to: "/search", search: { q: searchQuery } });
  };
  const clearHistory = (e) => {
    e.stopPropagation();
    setHistory([]);
    localStorage.removeItem("search_history");
  };
  const popular = ["Hyderabad", "Kyoto", "Taj Mahal", "Hampi", "Petra"];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full", ref: containerRef, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "form",
      {
        onSubmit: (e) => {
          e.preventDefault();
          handleSearchSubmit(q);
        },
        className: "glass-card rounded-full flex items-center gap-2 border border-border/80 focus-within:border-amber/50 focus-within:shadow-soft transition-all " + (big ? "p-2 pl-6 text-base" : "p-1.5 pl-4 text-sm"),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: big ? "h-5 w-5 text-amber" : "h-4 w-4 text-amber", strokeWidth: 1.8 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              value: q,
              onChange: (e) => {
                setQ(e.target.value);
                setIsOpen(true);
              },
              onFocus: () => setIsOpen(true),
              placeholder: "Where would you like to explore? — try Birla Mandir, Kyoto…",
              className: "flex-1 bg-transparent outline-none placeholder:text-muted-foreground/80 text-foreground",
              "aria-label": "Search destinations"
            }
          ),
          q && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => {
                setQ("");
                setIsOpen(true);
              },
              className: "p-1 text-muted-foreground/80 hover:text-foreground",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "submit",
              className: "rounded-full bg-[var(--gradient-amber)] text-primary-foreground font-medium hover:opacity-95 transition shadow-soft cursor-pointer " + (big ? "h-12 px-6" : "h-9 px-4"),
              children: "Search"
            }
          )
        ]
      }
    ),
    isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-[calc(100%+8px)] left-0 w-full bg-card border border-border/70 rounded-2xl shadow-elegant z-50 overflow-hidden animate-in fade-in-50 slide-in-from-top-2 duration-150", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-4 max-h-[420px] overflow-y-auto", children: [
      !q.trim() && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        history.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs uppercase tracking-[0.16em] text-muted-foreground mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
              " Recent Searches"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: clearHistory,
                className: "hover:text-amber transition-colors",
                children: "Clear"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: history.map((h, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => {
                setQ(h);
                handleSearchSubmit(h);
              },
              className: "flex items-center justify-between w-full text-left text-sm text-foreground/90 py-2 px-3 rounded-lg hover:bg-accent/40 transition-colors",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5 text-muted-foreground/80" }),
                  " ",
                  h
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-3 w-3 opacity-0 group-hover:opacity-100 text-muted-foreground" })
              ]
            },
            i
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs uppercase tracking-[0.16em] text-muted-foreground mb-2 flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3 text-amber" }),
            " Popular destinations"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: popular.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => {
                setQ(p);
                handleSearchSubmit(p);
              },
              className: "text-xs font-medium rounded-full bg-background border border-border/80 hover:border-amber/40 hover:bg-amber/10 px-3 py-1.5 transition-all text-foreground/95",
              children: p
            },
            p
          )) })
        ] })
      ] }),
      q.trim() && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        suggestions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs uppercase tracking-[0.16em] text-muted-foreground mb-2 flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3 text-amber" }),
            " Hand-picked places"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: suggestions.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => {
                saveSearchToHistory(d.name);
                setIsOpen(false);
                navigate({ to: "/destination/$slug", params: { slug: d.slug } });
              },
              className: "flex items-center justify-between w-full text-left py-2 px-3 rounded-lg hover:bg-accent/40 transition",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: d.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    d.city,
                    ", ",
                    d.country
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-amber uppercase tracking-wider", children: d.category })
              ]
            },
            d.slug
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs uppercase tracking-[0.16em] text-muted-foreground mb-2 flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3 text-amber" }),
            " Worldwide matches"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            loading && geoSuggestions.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground px-3 py-2 animate-pulse", children: "Searching global registry…" }),
            geoSuggestions.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => {
                  saveSearchToHistory(g.name);
                  setIsOpen(false);
                  navigate({
                    to: "/place/$name",
                    params: { name: g.name },
                    search: {
                      lat: g.latitude,
                      lng: g.longitude,
                      country: g.country,
                      admin: g.admin1 ?? ""
                    }
                  });
                },
                className: "flex items-center justify-between w-full text-left py-2 px-3 rounded-lg hover:bg-accent/40 transition",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: g.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: [g.admin1, g.country].filter(Boolean).join(", ") })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-3.5 w-3.5 text-muted-foreground/80" })
                ]
              },
              g.id
            )),
            !loading && geoSuggestions.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground px-3 py-2", children: "No other locations found. Press enter to search." })
          ] })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  SearchBar as S
};
