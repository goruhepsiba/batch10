import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { b as useServerFn, c as createSsrRpc } from "./router-BAKaFseM.mjs";
import { u as useRouter } from "../_libs/tanstack__react-router.mjs";
import { c as createServerFn } from "./server-rHDi7l_h.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/clerk__react.mjs";
import "../_libs/clerk__shared.mjs";
import "../_libs/seroval.mjs";
import { u as ShieldAlert, g as LoaderCircle, v as ShieldCheck, U as User } from "../_libs/lucide-react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "./env-CeXi8rGa.mjs";
import "./env-Bu12Jr7a.mjs";
import "./getGlobalStartContext-DRMFhrIa.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/scheduler.mjs";
import "../_libs/isbot.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/dequal.mjs";
const getUsersList = createServerFn({
  method: "GET"
}).handler(createSsrRpc("4a5ff6e762391fb989394c45483cf3d40a09f619ac3c6fcb9934367c6daf50de"));
const updateUserRole = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  targetUserId: stringType(),
  role: stringType()
})).handler(createSsrRpc("db31292ad4d7527a1941d9e2009dbc0ac4c2179cfacbb31f7928077a2a1fb269"));
function AdminPage() {
  const router = useRouter();
  const fetchUsers = useServerFn(getUsersList);
  const updateRole = useServerFn(updateUserRole);
  const [users, setUsers] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [updatingId, setUpdatingId] = reactExports.useState(null);
  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetchUsers();
      setUsers(res);
    } catch (err) {
      toast.error(err.message || "Failed to load user list");
    } finally {
      setLoading(false);
    }
  };
  reactExports.useEffect(() => {
    loadData();
  }, []);
  const handleRoleToggle = async (targetUserId, currentRole) => {
    const nextRole = currentRole === "admin" ? "tourist" : "admin";
    if (!confirm(`Are you sure you want to change this user's role to ${nextRole}?`)) return;
    setUpdatingId(targetUserId);
    try {
      await updateRole({
        data: {
          targetUserId,
          role: nextRole
        }
      });
      toast.success("User role updated successfully");
      await loadData();
      router.invalidate();
    } catch (err) {
      toast.error(err.message || "Could not update user role");
    } finally {
      setUpdatingId(null);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-prose pt-12 pb-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(239,68,68,0.03),transparent_50%)] pointer-events-none -z-10" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs uppercase tracking-[0.24em] text-red-500 font-semibold flex items-center gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "h-4 w-4" }),
      " Administration"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-5xl mt-2 font-bold", children: "Admin Console" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Manage user accounts and roles in the HeritageVerse platform." }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-amber" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 border border-border/60 bg-card rounded-2xl overflow-hidden shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left text-sm border-collapse", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border/60 bg-muted/40 text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4", children: "User" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4", children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4", children: "Role" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border/60", children: users.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-muted/10 transition", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-4 flex items-center gap-3", children: [
          u.image_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: u.image_url, alt: u.full_name || "", className: "h-8 w-8 rounded-full border border-border/60 object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-8 w-8 place-items-center rounded-full bg-amber/10 text-amber font-semibold text-xs", children: u.full_name?.charAt(0) || "U" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: u.full_name || "Traveler" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 text-muted-foreground font-mono text-xs", children: u.email }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${u.role === "admin" ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"}`, children: [
          u.role === "admin" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-3 w-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-3 w-3" }),
          u.role
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => handleRoleToggle(u.clerk_user_id, u.role), disabled: updatingId === u.clerk_user_id, className: "inline-flex h-8 items-center justify-center rounded-lg border border-border px-3 text-xs font-medium hover:bg-accent transition disabled:opacity-50 cursor-pointer", children: [
          updatingId === u.clerk_user_id ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3 w-3 animate-spin text-amber mr-1.5" }) : null,
          u.role === "admin" ? "Demote to Tourist" : "Promote to Admin"
        ] }) })
      ] }, u.id)) })
    ] }) }) })
  ] });
}
export {
  AdminPage as component
};
