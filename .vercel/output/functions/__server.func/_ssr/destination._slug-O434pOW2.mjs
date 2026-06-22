import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
const SplitNotFoundComponent = () => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-prose py-24 text-center", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm uppercase tracking-[0.2em] text-amber", children: "404" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl mt-2", children: "Destination not found" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/search", search: {
    q: ""
  }, className: "mt-6 inline-block text-amber underline underline-offset-4", children: "Browse destinations" })
] });
export {
  SplitNotFoundComponent as notFoundComponent
};
