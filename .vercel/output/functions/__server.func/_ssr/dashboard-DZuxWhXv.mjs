import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useAuth } from "./router-BAKaFseM.mjs";
import { s as supabase } from "./client-DwzOaH6b.mjs";
import "../_libs/clerk__react.mjs";
import "../_libs/clerk__shared.mjs";
import "../_libs/seroval.mjs";
import "../_libs/sonner.mjs";
import { H as Heart, g as LoaderCircle, A as ArrowRight, C as Compass, f as Sparkles, s as Search } from "../_libs/lucide-react.mjs";
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
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
function DashboardPage() {
  const {
    user
  } = useAuth();
  const [stats, setStats] = reactExports.useState({
    favorites: 0,
    trips: 0
  });
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    if (!user) return;
    let active = true;
    (async () => {
      try {
        const [{
          count: favsCount
        }, {
          count: tripsCount
        }] = await Promise.all([supabase.from("favorites").select("*", {
          count: "exact",
          head: true
        }), supabase.from("saved_trips").select("*", {
          count: "exact",
          head: true
        })]);
        if (active) {
          setStats({
            favorites: favsCount || 0,
            trips: tripsCount || 0
          });
        }
      } catch (err) {
        console.error("Could not fetch user stats:", err);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [user]);
  if (!user) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-prose pt-12 pb-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.05),transparent_50%)] pointer-events-none -z-10" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.24em] text-amber font-semibold", children: "Travel Center" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-4xl md:text-5xl mt-2 font-bold", children: [
      "Welcome, ",
      user.fullName || "Traveler",
      "!"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Manage your saved destinations and AI trips." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2 mt-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl glass-card p-6 shadow-soft hover:shadow-elegant transition duration-300 relative overflow-hidden group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition duration-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-24 w-24 text-amber" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground font-medium", children: "Favorite Places" }),
        loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin text-amber mt-2" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-4xl font-display font-bold text-amber mt-2", children: stats.favorites }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/favorites", className: "mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-amber hover:underline underline-offset-4", children: [
          "Manage favorites ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3 w-3" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl glass-card p-6 shadow-soft hover:shadow-elegant transition duration-300 relative overflow-hidden group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition duration-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "h-24 w-24 text-amber" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground font-medium", children: "Saved Itineraries" }),
        loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin text-amber mt-2" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-4xl font-display font-bold text-amber mt-2", children: stats.trips }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/favorites", className: "mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-amber hover:underline underline-offset-4", children: [
          "View itineraries ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3 w-3" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold mt-16", children: "Quick Actions" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2 mt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/planner", className: "rounded-2xl border border-border/60 bg-card p-6 hover:shadow-soft hover:border-amber/40 transition group flex flex-col justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-10 w-10 place-items-center rounded-full bg-amber/10 text-amber", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg font-semibold mt-4 group-hover:text-amber transition", children: "AI Trip Planner" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 font-light leading-relaxed", children: "Plan custom day-by-day routes and generate lists of landmarks instantly with AI." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mt-6 inline-flex items-center gap-1 text-xs font-semibold text-amber", children: [
          "Launch Planner ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5 group-hover:translate-x-1 transition" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/search", search: {
        q: ""
      }, className: "rounded-2xl border border-border/60 bg-card p-6 hover:shadow-soft hover:border-amber/40 transition group flex flex-col justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-10 w-10 place-items-center rounded-full bg-amber/10 text-amber", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg font-semibold mt-4 group-hover:text-amber transition", children: "Explore Destinations" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 font-light leading-relaxed", children: "Find historic monuments, cities, and cultural highlights with 360° views." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mt-6 inline-flex items-center gap-1 text-xs font-semibold text-amber", children: [
          "Search map ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5 group-hover:translate-x-1 transition" })
        ] })
      ] })
    ] })
  ] });
}
export {
  DashboardPage as component
};
