import { c as createServerRpc } from "./createServerRpc-D5vR6sPD.mjs";
import { c as createServerFn } from "./server-rHDi7l_h.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
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
const getUsersList_createServerFn_handler = createServerRpc({
  id: "4a5ff6e762391fb989394c45483cf3d40a09f619ac3c6fcb9934367c6daf50de",
  name: "getUsersList",
  filename: "src/routes/admin.tsx"
}, (opts) => getUsersList.__executeServer(opts));
const getUsersList = createServerFn({
  method: "GET"
}).handler(getUsersList_createServerFn_handler, async () => {
  const {
    getUsers
  } = await import("./admin.server-CZDD-5ad.mjs");
  return await getUsers();
});
const updateUserRole_createServerFn_handler = createServerRpc({
  id: "db31292ad4d7527a1941d9e2009dbc0ac4c2179cfacbb31f7928077a2a1fb269",
  name: "updateUserRole",
  filename: "src/routes/admin.tsx"
}, (opts) => updateUserRole.__executeServer(opts));
const updateUserRole = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  targetUserId: stringType(),
  role: stringType()
})).handler(updateUserRole_createServerFn_handler, async ({
  data: {
    targetUserId,
    role
  }
}) => {
  const {
    changeUserRole
  } = await import("./admin.server-CZDD-5ad.mjs");
  return await changeUserRole(targetUserId, role);
});
export {
  getUsersList_createServerFn_handler,
  updateUserRole_createServerFn_handler
};
