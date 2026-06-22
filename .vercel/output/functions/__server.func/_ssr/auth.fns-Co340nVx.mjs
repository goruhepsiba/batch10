import { c as createServerRpc } from "./createServerRpc-D5vR6sPD.mjs";
import { c as createServerFn } from "./server-rHDi7l_h.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/scheduler.mjs";
import "../_libs/isbot.mjs";
const checkAuth_createServerFn_handler = createServerRpc({
  id: "66b1e590f0d4997d9ed4cba88317acc65295332ad765eb3f607fa1cfdd52ba75",
  name: "checkAuth",
  filename: "src/lib/auth.fns.ts"
}, (opts) => checkAuth.__executeServer(opts));
const checkAuth = createServerFn({
  method: "GET"
}).handler(checkAuth_createServerFn_handler, async () => {
  const {
    requireAuth
  } = await import("./auth.server-Dx7c1dUI.mjs").then((n) => n.a);
  return await requireAuth();
});
const checkAdmin_createServerFn_handler = createServerRpc({
  id: "f6fc415e29ec4934761fd226c3386cda58c24ac14d4aaa02d6701f1ae65f2ada",
  name: "checkAdmin",
  filename: "src/lib/auth.fns.ts"
}, (opts) => checkAdmin.__executeServer(opts));
const checkAdmin = createServerFn({
  method: "GET"
}).handler(checkAdmin_createServerFn_handler, async () => {
  const {
    requireRole
  } = await import("./auth.server-Dx7c1dUI.mjs").then((n) => n.a);
  return await requireRole("admin");
});
const syncUserSession_createServerFn_handler = createServerRpc({
  id: "0f1e3d259c849aa9c3b2c96d82f72a15cc19299cc9d34b757be612173a94929d",
  name: "syncUserSession",
  filename: "src/lib/auth.fns.ts"
}, (opts) => syncUserSession.__executeServer(opts));
const syncUserSession = createServerFn({
  method: "POST"
}).handler(syncUserSession_createServerFn_handler, async () => {
  const {
    syncUser
  } = await import("./auth.server-Dx7c1dUI.mjs").then((n) => n.a);
  return await syncUser();
});
export {
  checkAdmin_createServerFn_handler,
  checkAuth_createServerFn_handler,
  syncUserSession_createServerFn_handler
};
