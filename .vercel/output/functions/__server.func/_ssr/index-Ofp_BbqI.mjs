import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { d as destinations } from "./router-BAKaFseM.mjs";
import { D as DestinationCard } from "./DestinationCard-DIwhBAba.mjs";
import { S as SearchBar } from "./SearchBar-Brg0N7H5.mjs";
import "../_libs/clerk__react.mjs";
import "../_libs/clerk__shared.mjs";
import "../_libs/seroval.mjs";
import "../_libs/sonner.mjs";
import { w as Landmark, E as Earth, x as Map, A as ArrowRight, f as Sparkles } from "../_libs/lucide-react.mjs";
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
import "./geocode-D87yC2R4.mjs";
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
const heroImg = "/assets/hero-heritage-kQR7D18m.jpg";
const collections = [{
  label: "Forts",
  icon: Landmark
}, {
  label: "Palaces",
  icon: Landmark
}, {
  label: "Temples",
  icon: Landmark
}, {
  label: "Museums",
  icon: Landmark
}, {
  label: "UNESCO Sites",
  icon: Earth
}, {
  label: "Monuments",
  icon: Landmark
}, {
  label: "Natural Wonders",
  icon: Map
}];
function Home() {
  const featured = destinations.slice(0, 6);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative isolate overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 -z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroImg, alt: "Ancient heritage temple at golden hour", width: 1920, height: 1080, className: "h-full w-full object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0", style: {
          background: "var(--gradient-hero)"
        } })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-prose pt-28 pb-32 md:pt-40 md:pb-44 text-parchment", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs md:text-sm uppercase tracking-[0.32em] text-amber/90", children: "AI-powered heritage tourism" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-5 font-display text-5xl md:text-7xl leading-[1.02] max-w-3xl text-parchment", children: [
          "Walk through time.",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic text-gradient-amber", children: "Plan it in seconds." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 max-w-xl text-parchment/85 text-lg", children: "Search any city, monument or country — discover heritage sites, hotels, weather, 360° tours and AI-crafted itineraries, all in one place." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 max-w-2xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SearchBar, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap gap-2 text-sm text-parchment/70", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-70", children: "Popular —" }),
            ["Hyderabad", "Taj Mahal", "Kyoto", "Hampi", "Petra"].map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/search", search: {
              q: p
            }, className: "hover:text-amber transition-colors underline-offset-4 hover:underline", children: p }, p))
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "container-prose -mt-12 relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-card rounded-2xl p-4 md:p-6 flex flex-wrap gap-2 md:gap-3 justify-center", children: collections.map(({
      label,
      icon: Icon
    }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/search", search: {
      q: label
    }, className: "inline-flex items-center gap-2 rounded-full bg-background/60 hover:bg-amber/15 transition-colors px-4 py-2 text-sm border border-border/60", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-amber", strokeWidth: 1.7 }),
      label
    ] }, label)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-prose mt-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.24em] text-amber", children: "Featured destinations" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-4xl md:text-5xl mt-2", children: [
            "Where heritage ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic", children: "comes alive" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/search", search: {
          q: ""
        }, className: "hidden md:inline-flex items-center gap-1 text-sm text-foreground hover:text-amber transition-colors", children: [
          "View all ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 md:gap-7 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3", children: featured.map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(DestinationCard, { d, eager: i < 3 }, d.slug)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "container-prose mt-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-10 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.24em] text-amber", children: "Why HeritageVerse" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-4xl md:text-5xl mt-2 leading-[1.05]", children: [
          "A travel guide",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic", children: "written for the curious." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-muted-foreground max-w-md", children: "Every destination is built like an editorial dossier — history, architecture, timeline, hotels, weather, maps, and a 360° street view. Pair it with our AI planner and you have a trip ready in minutes." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4", children: [{
        icon: Sparkles,
        title: "AI itineraries",
        body: "Tailored day-by-day plans with real places and food."
      }, {
        icon: Earth,
        title: "Global heritage",
        body: "From Charminar to Angkor Wat — UNESCO and beyond."
      }, {
        icon: Map,
        title: "Maps & 360°",
        body: "Walk locations virtually before you arrive."
      }, {
        icon: Landmark,
        title: "Rich guides",
        body: "Architecture, timelines and cultural context."
      }].map(({
        icon: Icon,
        title,
        body
      }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border/60 bg-card p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5 text-amber", strokeWidth: 1.7 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl mt-3", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: body })
      ] }, title)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "container-prose mt-28", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative overflow-hidden rounded-3xl p-10 md:p-16 text-parchment", style: {
      background: "var(--gradient-amber)"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-4xl md:text-5xl leading-[1.05]", children: [
        "Tell us your dream trip.",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic", children: "We'll plan the rest." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-parchment/90", children: "Budget, days, interests — our AI concierge crafts a heritage itinerary in seconds." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/planner", className: "mt-7 inline-flex items-center gap-2 rounded-full bg-ink text-parchment px-6 py-3 text-sm font-medium hover:opacity-90", style: {
        backgroundColor: "var(--ink)"
      }, children: [
        "Open AI Planner ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
      ] })
    ] }) }) })
  ] });
}
export {
  Home as component
};
