import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { S as SearchBar } from "./SearchBar-Brg0N7H5.mjs";
import { D as DestinationCard } from "./DestinationCard-DIwhBAba.mjs";
import { R as Route$c, s as searchDestinations } from "./router-BAKaFseM.mjs";
import { g as geocodePlace } from "./geocode-D87yC2R4.mjs";
import "../_libs/clerk__react.mjs";
import "../_libs/clerk__shared.mjs";
import "../_libs/seroval.mjs";
import "../_libs/sonner.mjs";
import { f as Sparkles, g as LoaderCircle, h as MapPin } from "../_libs/lucide-react.mjs";
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
import "./client-DwzOaH6b.mjs";
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
function SearchPage() {
  const {
    q
  } = Route$c.useSearch();
  const curated = searchDestinations(q);
  const [geo, setGeo] = reactExports.useState([]);
  const [geoLoading, setGeoLoading] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!q.trim()) {
      setGeo([]);
      return;
    }
    let cancelled = false;
    setGeoLoading(true);
    geocodePlace(q, 8).then((r) => {
      if (!cancelled) setGeo(r);
    }).finally(() => {
      if (!cancelled) setGeoLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [q]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-prose pt-12 pb-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.24em] text-amber", children: "Search" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-5xl mt-2", children: q ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      "Results for ",
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "italic", children: [
        '"',
        q,
        '"'
      ] })
    ] }) : "Explore every destination" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 max-w-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SearchBar, { size: "md" }) }),
    curated.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.24em] text-amber", children: "Curated heritage sites" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: q.trim() ? `${curated.length} match${curated.length === 1 ? "" : "es"}` : `${curated.length} hand-picked` })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3", children: curated.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(DestinationCard, { d }, d.slug)) })
    ] }),
    q.trim() && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-amber" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.24em] text-amber", children: "Any place on Earth" })
        ] }),
        geoLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin text-amber" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-muted-foreground text-sm", children: "We'll generate a rich heritage profile for any city, monument or landmark you pick." }),
      !geoLoading && geo.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 rounded-2xl border border-border/60 bg-card p-8 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl", children: "No worldwide match found." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Try a different spelling or a broader name." })
      ] }),
      geo.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: geo.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/place/$name", params: {
        name: g.name
      }, search: {
        lat: g.latitude,
        lng: g.longitude,
        country: g.country,
        admin: g.admin1 ?? ""
      }, className: "group rounded-2xl glass-card p-5 hover:shadow-elegant transition-all duration-500 hover:-translate-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl leading-tight group-hover:text-amber transition", children: g.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 flex items-center gap-1.5 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5" }),
          [g.admin1, g.country].filter(Boolean).join(", ")
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-xs text-amber uppercase tracking-[0.2em]", children: "Open profile →" })
      ] }, g.id)) })
    ] })
  ] });
}
export {
  SearchPage as component
};
