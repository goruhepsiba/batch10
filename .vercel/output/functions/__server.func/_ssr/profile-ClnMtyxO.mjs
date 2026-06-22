import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useAuth } from "./router-BAKaFseM.mjs";
import "../_libs/clerk__react.mjs";
import "../_libs/clerk__shared.mjs";
import "../_libs/seroval.mjs";
import "../_libs/sonner.mjs";
import { U as User, i as Mail, j as Shield, k as Calendar } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__react-router.mjs";
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
function ProfilePage() {
  const {
    user
  } = useAuth();
  if (!user) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-prose pt-12 pb-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.05),transparent_50%)] pointer-events-none -z-10" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.24em] text-amber font-semibold", children: "Account settings" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-5xl mt-2 font-bold", children: "Personal Profile" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Manage your synced user account credentials." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 rounded-2xl border border-border/60 bg-card/60 backdrop-blur overflow-hidden shadow-soft", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 border-b border-border/60 bg-muted/30", children: [
        user.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: user.imageUrl, alt: user.fullName, className: "h-20 w-20 rounded-full border border-border/80 object-cover shadow-sm" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 w-20 rounded-full border border-border/80 bg-background flex items-center justify-center shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-8 w-8 text-amber" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center sm:text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold", children: user.fullName || "Traveler" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: user.email })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 sm:p-8 space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-9 w-9 place-items-center rounded-lg bg-amber/10 text-amber mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4.5 w-4.5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wider", children: "Email Address" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold mt-1", children: user.email })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-9 w-9 place-items-center rounded-lg bg-amber/10 text-amber mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-4.5 w-4.5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wider", children: "Authorization Role" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold mt-1 capitalize flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-emerald-500 inline-block" }),
              user.role
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-9 w-9 place-items-center rounded-lg bg-amber/10 text-amber mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4.5 w-4.5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wider", children: "Account Sync Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold mt-1 text-emerald-600 dark:text-emerald-400", children: "Active & Synced" })
          ] })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  ProfilePage as component
};
