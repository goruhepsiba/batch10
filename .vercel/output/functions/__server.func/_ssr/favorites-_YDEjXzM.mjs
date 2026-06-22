import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { s as supabase } from "./client-DwzOaH6b.mjs";
import { u as useAuth, f as findDestination } from "./router-BAKaFseM.mjs";
import "../_libs/clerk__react.mjs";
import "../_libs/clerk__shared.mjs";
import "../_libs/seroval.mjs";
import { g as LoaderCircle, H as Heart, h as MapPin, T as Trash2, r as BookMarked, k as Calendar, A as ArrowRight } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/scheduler.mjs";
import "../_libs/isbot.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "./env-CeXi8rGa.mjs";
import "./server-rHDi7l_h.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "./env-Bu12Jr7a.mjs";
import "./getGlobalStartContext-DRMFhrIa.mjs";
import "../_libs/zod.mjs";
import "../_libs/dequal.mjs";
function FavoritesPage() {
  const {
    user,
    loading: authLoading
  } = useAuth();
  const navigate = useNavigate();
  const [favorites, setFavorites] = reactExports.useState([]);
  const [trips, setTrips] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    if (authLoading || !user) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      const [{
        data: favs
      }, {
        data: tps
      }] = await Promise.all([supabase.from("favorites").select("*").order("created_at", {
        ascending: false
      }), supabase.from("saved_trips").select("id,destination,days,budget,itinerary,created_at").order("created_at", {
        ascending: false
      })]);
      if (cancelled) return;
      setFavorites(favs ?? []);
      setTrips(tps ?? []);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [user, authLoading, navigate]);
  const removeFav = async (id) => {
    const prev = favorites;
    setFavorites(favorites.filter((f) => f.id !== id));
    const {
      error
    } = await supabase.from("favorites").delete().eq("id", id);
    if (error) {
      setFavorites(prev);
      toast.error(error.message);
    } else toast.success("Removed");
  };
  const removeTrip = async (id) => {
    const prev = trips;
    setTrips(trips.filter((t) => t.id !== id));
    const {
      error
    } = await supabase.from("saved_trips").delete().eq("id", id);
    if (error) {
      setTrips(prev);
      toast.error(error.message);
    } else toast.success("Trip removed");
  };
  if (authLoading || !user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "container-prose py-24 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mx-auto h-6 w-6 animate-spin text-amber" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-prose pt-12 pb-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.24em] text-amber", children: "My collection" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-5xl mt-2", children: "Saved places & itineraries" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-muted-foreground", children: [
      "Welcome back, ",
      user.email,
      "."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-2xl flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-5 w-5 text-amber fill-amber" }),
        " Favorite places"
      ] }),
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground", children: "Loading…" }) : favorites.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 rounded-2xl border border-border/60 bg-card p-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No favorites yet. Tap the heart on any place to save it here." }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: favorites.map((f) => {
        const curated = f.kind === "curated" ? findDestination(f.ref) : null;
        const href = curated ? {
          to: "/destination/$slug",
          params: {
            slug: f.ref
          }
        } : {
          to: "/place/$name",
          params: {
            name: f.name
          },
          search: {
            lat: f.lat ?? 0,
            lng: f.lng ?? 0,
            country: f.country ?? "",
            admin: ""
          }
        };
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative rounded-2xl border border-border/60 bg-card overflow-hidden hover:shadow-soft transition", children: [
          curated && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: curated.hero, alt: curated.name, className: "h-32 w-full object-cover" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { ...href, className: "block", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl group-hover:text-amber transition", children: f.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 flex items-center gap-1.5 text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5" }),
                f.country ?? f.kind
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => removeFav(f.id), className: "mt-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive transition", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }),
              " Remove"
            ] })
          ] })
        ] }, f.id);
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-2xl flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BookMarked, { className: "h-5 w-5 text-amber" }),
        " Saved AI itineraries"
      ] }),
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground", children: "Loading…" }) : trips.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 rounded-2xl border border-border/60 bg-card p-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
        "No saved itineraries yet. Generate one in the",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/planner", className: "text-amber underline underline-offset-4", children: "AI Planner" }),
        "."
      ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 grid gap-4 md:grid-cols-2", children: trips.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border/60 bg-card p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl leading-tight", children: t.destination }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs uppercase tracking-[0.2em] text-amber flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3 w-3" }),
              " ",
              t.days,
              " days · ",
              t.budget
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => removeTrip(t.id), "aria-label": "Remove trip", className: "text-muted-foreground hover:text-destructive transition", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
        ] }),
        t.itinerary?.summary && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-foreground/80 line-clamp-4", children: t.itinerary.summary }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/planner", search: {
            tripId: t.id
          }, className: "inline-flex items-center gap-1.5 text-xs font-semibold text-amber hover:underline underline-offset-4", children: [
            "View full itinerary ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
            "Saved ",
            new Date(t.created_at).toLocaleDateString()
          ] })
        ] })
      ] }, t.id)) })
    ] })
  ] });
}
export {
  FavoritesPage as component
};
