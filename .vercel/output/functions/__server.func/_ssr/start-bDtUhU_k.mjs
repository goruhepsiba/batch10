import { a as createMiddleware, b as createCsrfMiddleware } from "./server-rHDi7l_h.mjs";
import { c as clerkClient, a as commonEnvs } from "./clerkClient-D1RTEUpt.mjs";
import { P as isTruthy, j as getEnvVariable, Q as isDevelopmentEnvironment, R as isAutomatedEnvironment, S as handleNetlifyCacheInDevInstance, U as apiUrlFromPublishableKey, V as isProxyUrlRelative, W as isHttpOrHttps, B as isDevelopmentFromSecretKey, X as resolveKeysWithKeylessFallback$1, Y as createKeylessService, Z as createNodeFileStorage } from "../_libs/clerk__shared.mjs";
import * as fs from "node:fs";
import * as path from "node:path";
import { e as errorThrower } from "./env-Bu12Jr7a.mjs";
import { c as createClerkRequest, a as constants, A as AuthStatus, d as debugRequestState } from "../_libs/clerk__backend.mjs";
import { v as validateEnv } from "./env-CeXi8rGa.mjs";
import { r as renderErrorPage } from "./index.mjs";
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
import "../_libs/dequal.mjs";
import "node:crypto";
function dedupeSerializationAdapters(deduped, serializationAdapters) {
  for (let i = 0, len = serializationAdapters.length; i < len; i++) {
    const current = serializationAdapters[i];
    if (!deduped.has(current)) {
      deduped.add(current);
      if (current.extends) dedupeSerializationAdapters(deduped, current.extends);
    }
  }
}
var createStart = (getOptions) => {
  return {
    getOptions: async () => {
      const options = await getOptions();
      if (options.serializationAdapters) {
        const deduped = /* @__PURE__ */ new Set();
        dedupeSerializationAdapters(deduped, options.serializationAdapters);
        options.serializationAdapters = Array.from(deduped);
      }
      return options;
    },
    createMiddleware
  };
};
const KEYLESS_DISABLED = isTruthy(getEnvVariable("VITE_CLERK_KEYLESS_DISABLED")) || isTruthy(getEnvVariable("CLERK_KEYLESS_DISABLED")) || false;
const canUseKeyless = isDevelopmentEnvironment() && !isAutomatedEnvironment() && !KEYLESS_DISABLED;
function createFileStorage(options = {}) {
  const { cwd = () => process.cwd() } = options;
  return createNodeFileStorage(fs, path, {
    cwd,
    frameworkPackageName: "@clerk/tanstack-react-start"
  });
}
let keylessServiceInstance = null;
function keyless() {
  if (!keylessServiceInstance) keylessServiceInstance = createKeylessService({
    storage: createFileStorage(),
    api: {
      async createAccountlessApplication(requestHeaders, source) {
        try {
          return await clerkClient().__experimental_accountlessApplications.createAccountlessApplication({
            requestHeaders,
            source
          });
        } catch {
          return null;
        }
      },
      async completeOnboarding(requestHeaders, source) {
        try {
          return await clerkClient().__experimental_accountlessApplications.completeAccountlessApplicationOnboarding({
            requestHeaders,
            source
          });
        } catch {
          return null;
        }
      }
    },
    framework: "tanstack-react-start"
  });
  return keylessServiceInstance;
}
function resolveKeysWithKeylessFallback(configuredPublishableKey, configuredSecretKey) {
  return resolveKeysWithKeylessFallback$1(configuredPublishableKey, configuredSecretKey, keyless(), canUseKeyless);
}
const loadOptions = (request, overrides = {}) => {
  const commonEnv = commonEnvs();
  const secretKey = overrides.secretKey || commonEnv.SECRET_KEY;
  const machineSecretKey = overrides.machineSecretKey || commonEnv.MACHINE_SECRET_KEY;
  const publishableKey = overrides.publishableKey || commonEnv.PUBLISHABLE_KEY;
  const jwtKey = overrides.jwtKey || commonEnv.CLERK_JWT_KEY;
  const apiUrl = getEnvVariable("CLERK_API_URL") || apiUrlFromPublishableKey(publishableKey);
  const domain = overrides.domain || commonEnv.DOMAIN;
  const isSatellite = overrides.isSatellite || commonEnv.IS_SATELLITE;
  const relativeOrAbsoluteProxyUrl = overrides.proxyUrl || commonEnv.PROXY_URL;
  const signInUrl = overrides.signInUrl || commonEnv.SIGN_IN_URL;
  const signUpUrl = overrides.signUpUrl || commonEnv.SIGN_UP_URL;
  const satelliteAutoSync = overrides.satelliteAutoSync;
  let proxyUrl;
  if (!!relativeOrAbsoluteProxyUrl && isProxyUrlRelative(relativeOrAbsoluteProxyUrl)) proxyUrl = new URL(relativeOrAbsoluteProxyUrl, request.clerkUrl).toString();
  else proxyUrl = relativeOrAbsoluteProxyUrl;
  if (!secretKey && !canUseKeyless) throw errorThrower.throw("Clerk: no secret key provided");
  if (isSatellite && !proxyUrl && !domain) throw errorThrower.throw("Clerk: satellite mode requires a proxy URL or domain");
  if (isSatellite && secretKey && !isHttpOrHttps(signInUrl) && isDevelopmentFromSecretKey(secretKey)) throw errorThrower.throw("Clerk: satellite mode requires a sign-in URL in production");
  return {
    ...overrides,
    secretKey,
    machineSecretKey,
    publishableKey,
    jwtKey,
    apiUrl,
    domain,
    isSatellite,
    proxyUrl,
    signInUrl,
    signUpUrl,
    satelliteAutoSync
  };
};
const wrapWithClerkState = (data) => {
  return { __internal_clerk_state: { ...data } };
};
function getPrefetchUIFromEnv() {
  if (getEnvVariable("CLERK_PREFETCH_UI") === "false") return false;
}
function getUnsafeDisableDevelopmentModeConsoleWarningFromEnv() {
  const value = getEnvVariable("VITE_CLERK_UNSAFE_DISABLE_DEVELOPMENT_MODE_CONSOLE_WARNING") || getEnvVariable("CLERK_UNSAFE_DISABLE_DEVELOPMENT_MODE_CONSOLE_WARNING");
  return value ? isTruthy(value) : void 0;
}
function getResponseClerkState(requestState, additionalStateOptions = {}) {
  const { reason, message, isSignedIn, ...rest } = requestState;
  return wrapWithClerkState({
    __clerk_ssr_state: rest.toAuth(),
    __publishableKey: requestState.publishableKey,
    __proxyUrl: requestState.proxyUrl,
    __domain: requestState.domain,
    __isSatellite: requestState.isSatellite,
    __signInUrl: requestState.signInUrl,
    __signUpUrl: requestState.signUpUrl,
    __afterSignInUrl: requestState.afterSignInUrl,
    __afterSignUpUrl: requestState.afterSignUpUrl,
    __clerk_debug: debugRequestState(requestState),
    __clerkJSUrl: getEnvVariable("CLERK_JS") || getEnvVariable("CLERK_JS_URL"),
    __clerkJSVersion: getEnvVariable("CLERK_JS_VERSION"),
    __clerkUIUrl: getEnvVariable("CLERK_UI_URL"),
    __clerkUIVersion: getEnvVariable("CLERK_UI_VERSION"),
    __prefetchUI: getPrefetchUIFromEnv(),
    __telemetryDisabled: isTruthy(getEnvVariable("CLERK_TELEMETRY_DISABLED")),
    __telemetryDebug: isTruthy(getEnvVariable("CLERK_TELEMETRY_DEBUG")),
    __unsafeDisableDevelopmentModeConsoleWarning: getUnsafeDisableDevelopmentModeConsoleWarningFromEnv(),
    __signInForceRedirectUrl: additionalStateOptions.signInForceRedirectUrl || getEnvVariable("CLERK_SIGN_IN_FORCE_REDIRECT_URL") || "",
    __signUpForceRedirectUrl: additionalStateOptions.signUpForceRedirectUrl || getEnvVariable("CLERK_SIGN_UP_FORCE_REDIRECT_URL") || "",
    __signInFallbackRedirectUrl: additionalStateOptions.signInFallbackRedirectUrl || getEnvVariable("CLERK_SIGN_IN_FALLBACK_REDIRECT_URL") || "",
    __signUpFallbackRedirectUrl: additionalStateOptions.signUpFallbackRedirectUrl || getEnvVariable("CLERK_SIGN_UP_FALLBACK_REDIRECT_URL") || ""
  });
}
const patchRequest = (request) => {
  const clonedRequest = new Request(request.url, {
    headers: request.headers,
    method: request.method,
    redirect: request.redirect,
    cache: request.cache
  });
  if (clonedRequest.method !== "GET" && clonedRequest.body !== null && !("duplex" in clonedRequest)) clonedRequest.duplex = "half";
  return clonedRequest;
};
const clerkMiddleware = (options) => {
  return createMiddleware().server(async ({ request, next }) => {
    const clerkRequest = createClerkRequest(patchRequest(request));
    const resolvedOptions = options;
    const loadedOptions = loadOptions(clerkRequest, {
      ...resolvedOptions,
      publishableKey: resolvedOptions?.publishableKey,
      secretKey: resolvedOptions?.secretKey
    });
    const { publishableKey, secretKey, claimUrl: keylessClaimUrl, apiKeysUrl: keylessApiKeysUrl } = await resolveKeysWithKeylessFallback(loadedOptions.publishableKey, loadedOptions.secretKey);
    if (publishableKey) loadedOptions.publishableKey = publishableKey;
    if (secretKey) loadedOptions.secretKey = secretKey;
    const requestState = await clerkClient().authenticateRequest(clerkRequest, {
      ...loadedOptions,
      acceptsToken: "any"
    });
    const locationHeader = requestState.headers.get(constants.Headers.Location);
    if (locationHeader) {
      handleNetlifyCacheInDevInstance({
        locationHeader,
        requestStateHeaders: requestState.headers,
        publishableKey: requestState.publishableKey
      });
      throw new Response(null, {
        status: 307,
        headers: requestState.headers
      });
    }
    if (requestState.status === AuthStatus.Handshake) throw new Error("Clerk: handshake status without redirect");
    const clerkInitialState = getResponseClerkState(requestState, loadedOptions);
    if (canUseKeyless && keylessClaimUrl) clerkInitialState.__internal_clerk_state = {
      ...clerkInitialState.__internal_clerk_state,
      __keylessClaimUrl: keylessClaimUrl,
      __keylessApiKeysUrl: keylessApiKeysUrl
    };
    const result = await next({ context: {
      clerkInitialState,
      auth: (opts) => requestState.toAuth(opts)
    } });
    if (requestState.headers) requestState.headers.forEach((value, key) => {
      result.response.headers.append(key, value);
    });
    return result;
  });
};
validateEnv();
const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" }
    });
  }
});
const csrfMiddleware = createCsrfMiddleware({
  filter: (ctx) => ctx.handlerType === "serverFn"
});
const startInstance = createStart(() => ({
  requestMiddleware: [clerkMiddleware(), errorMiddleware, csrfMiddleware]
}));
export {
  startInstance
};
