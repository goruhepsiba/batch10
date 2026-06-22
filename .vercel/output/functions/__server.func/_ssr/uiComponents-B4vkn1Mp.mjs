import { S as SignUp$1, a as useRoutingProps, b as SignIn$1, c as UserProfile, O as OrganizationProfile, d as OrganizationList } from "../_libs/clerk__react.mjs";
import { g as useParams, f as useLocation } from "../_libs/tanstack__react-router.mjs";
import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
const usePathnameWithoutSplatRouteParams = () => {
  const { _splat } = useParams({ strict: false });
  const { pathname } = useLocation();
  const splatRouteParam = _splat || "";
  return reactExports.useRef(`/${pathname.replace(splatRouteParam, "").replace(/\/$/, "").replace(/^\//, "").trim()}`).current;
};
Object.assign((props) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(UserProfile, { ...useRoutingProps("UserProfile", props, { path: usePathnameWithoutSplatRouteParams() }) });
}, { ...UserProfile });
Object.assign((props) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(OrganizationProfile, { ...useRoutingProps("OrganizationProfile", props, { path: usePathnameWithoutSplatRouteParams() }) });
}, { ...OrganizationProfile });
Object.assign((props) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(OrganizationList, { ...useRoutingProps("OrganizationList", props, { path: usePathnameWithoutSplatRouteParams() }) });
}, { ...OrganizationList });
const SignIn = (props) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SignIn$1, { ...useRoutingProps("SignIn", props, { path: usePathnameWithoutSplatRouteParams() }) });
};
const SignUp = (props) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SignUp$1, { ...useRoutingProps("SignUp", props, { path: usePathnameWithoutSplatRouteParams() }) });
};
export {
  SignUp as S,
  SignIn as a
};
