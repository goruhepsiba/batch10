import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useAuth } from "./router-BAKaFseM.mjs";
import "../_libs/clerk__react.mjs";
import "../_libs/clerk__shared.mjs";
import "../_libs/seroval.mjs";
import "../_libs/sonner.mjs";
import { P as Plane, t as Hotel, k as Calendar, C as Compass, A as ArrowRight } from "../_libs/lucide-react.mjs";
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
const mockBookings = [{
  id: "bk-102",
  type: "flight",
  destination: "Rome, Italy (FCO)",
  date: "July 12, 2026",
  status: "Confirmed",
  airline: "Heritage Airways",
  price: "$540.00"
}, {
  id: "bk-103",
  type: "hotel",
  destination: "Colosseum Grand Suites, Rome",
  date: "July 12 - July 18, 2026",
  status: "Confirmed",
  details: "1 Room, Double Bed",
  price: "$820.00"
}];
function BookingsPage() {
  const {
    user
  } = useAuth();
  if (!user) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-prose pt-12 pb-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.05),transparent_50%)] pointer-events-none -z-10" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.24em] text-amber font-semibold", children: "Itinerary details" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-5xl mt-2 font-bold", children: "My Bookings" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Manage your flight and hotel bookings for upcoming trips." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 space-y-6", children: mockBookings.map((booking) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border/60 bg-card p-6 shadow-soft hover:shadow-elegant transition duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-12 w-12 place-items-center rounded-full bg-amber/10 text-amber mt-1 shrink-0", children: booking.type === "flight" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Plane, { className: "h-5.5 w-5.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Hotel, { className: "h-5.5 w-5.5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl font-bold leading-tight", children: booking.destination }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-amber uppercase tracking-wider mt-1.5 flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5" }),
            " ",
            booking.date
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2", children: booking.type === "flight" ? booking.airline : booking.details })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center md:flex-col items-start md:items-end justify-between md:justify-center border-t md:border-t-0 pt-4 md:pt-0 border-border/60", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wider md:text-right", children: "Price" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg font-bold text-foreground mt-0.5", children: booking.price })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400", children: booking.status })
      ] })
    ] }, booking.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 text-center rounded-2xl bg-amber/5 border border-amber/15 p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "mx-auto h-8 w-8 text-amber animate-spin", style: {
        animationDuration: "8s"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold mt-4", children: "Planning another heritage tour?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2 max-w-sm mx-auto font-light", children: "Use the AI Itinerary Planner to draft day-by-day itineraries and explore hotels in Rome, Kyoto, and more." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/planner", className: "mt-6 inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 shadow-soft transition cursor-pointer", children: [
        "Plan new trip ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
      ] })
    ] })
  ] });
}
export {
  BookingsPage as component
};
