import { u as useAssertWrappedByClerkProvider, a as useClerkInstanceContext, b as buildErrorThrower, e as eventMethodCalled, l as logErrorInDevMode, c as useInitialStateContext, d as deriveState, i as inBrowser, C as ClerkRuntimeError, f as createCheckAuthorization, r as resolveAuthState, w as without, g as isDeeplyEqual, h as usePortalRoot, j as getEnvVariable, k as deprecated, m as isVersionCompatible, n as ClerkContextProvider, o as handleValueOrFn, p as createClerkEventBus, q as clerkEvents, s as loadClerkJSScript, t as loadClerkUIScript, v as setClerkJSLoadingErrorPackageName } from "./clerk__shared.mjs";
import { r as reactExports, R as React, b as jsxRuntime, c as react } from "./react.mjs";
import { r as reactDomExports, a as reactDomClient, b as reactDom } from "./react-dom.mjs";
const errorThrower = buildErrorThrower({ packageName: "@clerk/react" });
function setErrorThrowerOptions(options) {
  errorThrower.setMessages(options).setPackageName(options);
}
const useIsomorphicClerkContext = useClerkInstanceContext;
const useAssertWrappedByClerkProvider$1 = (source) => {
  useAssertWrappedByClerkProvider(() => {
    errorThrower.throwMissingClerkProviderError({ source });
  });
};
const multipleClerkProvidersError = "You've added multiple <ClerkProvider> components in your React component tree. Wrap your components in a single <ClerkProvider>.";
const multipleChildrenInButtonComponent = (name) => `You've passed multiple children components to <${name}/>. You can only pass a single child component or text.`;
const invalidStateError = "Invalid state. Feel free to submit a bug or reach out to support here: https://clerk.com/contact/support";
const unsupportedNonBrowserDomainOrProxyUrlFunction = "Unsupported usage of isSatellite, domain or proxyUrl. The usage of isSatellite, domain or proxyUrl as function is not supported in non-browser environments.";
const userProfilePageRenderedError = "<UserProfile.Page /> component needs to be a direct child of `<UserProfile />` or `<UserButton />`.";
const userProfileLinkRenderedError = "<UserProfile.Link /> component needs to be a direct child of `<UserProfile />` or `<UserButton />`.";
const organizationProfilePageRenderedError = "<OrganizationProfile.Page /> component needs to be a direct child of `<OrganizationProfile />` or `<OrganizationSwitcher />`.";
const organizationProfileLinkRenderedError = "<OrganizationProfile.Link /> component needs to be a direct child of `<OrganizationProfile />` or `<OrganizationSwitcher />`.";
const customPagesIgnoredComponent = (componentName) => `<${componentName} /> can only accept <${componentName}.Page /> and <${componentName}.Link /> as its children. Any other provided component will be ignored. Additionally, please ensure that the component is rendered in a client component.`;
const customPageWrongProps = (componentName) => `Missing props. <${componentName}.Page /> component requires the following props: url, label, labelIcon, alongside with children to be rendered inside the page.`;
const customLinkWrongProps = (componentName) => `Missing props. <${componentName}.Link /> component requires the following props: url, label and labelIcon.`;
const noPathProvidedError = (componentName) => `The <${componentName}/> component uses path-based routing by default unless a different routing strategy is provided using the \`routing\` prop. When path-based routing is used, you need to provide the path where the component is mounted on by using the \`path\` prop. Example: <${componentName} path={'/my-path'} />`;
const incompatibleRoutingWithPathProvidedError = (componentName) => `The \`path\` prop will only be respected when the Clerk component uses path-based routing. To resolve this error, pass \`routing='path'\` to the <${componentName}/> component, or drop the \`path\` prop to switch to hash-based routing. For more details please refer to our docs: https://clerk.com/docs`;
const userButtonIgnoredComponent = `<UserButton /> can only accept <UserButton.UserProfilePage />, <UserButton.UserProfileLink /> and <UserButton.MenuItems /> as its children. Any other provided component will be ignored. Additionally, please ensure that the component is rendered in a client component.`;
const customMenuItemsIgnoredComponent = "<UserButton.MenuItems /> component can only accept <UserButton.Action /> and <UserButton.Link /> as its children. Any other provided component will be ignored. Additionally, please ensure that the component is rendered in a client component.";
const userButtonMenuItemsRenderedError = "<UserButton.MenuItems /> component needs to be a direct child of `<UserButton />`.";
const userButtonMenuActionRenderedError = "<UserButton.Action /> component needs to be a direct child of `<UserButton.MenuItems />`.";
const userButtonMenuLinkRenderedError = "<UserButton.Link /> component needs to be a direct child of `<UserButton.MenuItems />`.";
const userButtonMenuItemLinkWrongProps = "Missing props. <UserButton.Link /> component requires the following props: href, label and labelIcon.";
const userButtonMenuItemsActionWrongsProps = "Missing props. <UserButton.Action /> component requires the following props: label.";
const assertSingleChild = (children) => (name) => {
  try {
    return React.Children.only(children);
  } catch {
    const childArray = React.Children.toArray(children);
    if (childArray.length === 1 && React.isValidElement(childArray[0])) return childArray[0];
    return errorThrower.throw(multipleChildrenInButtonComponent(name));
  }
};
const normalizeWithDefaultValue = (children, defaultText) => {
  if (!children) children = defaultText;
  if (typeof children === "string") children = /* @__PURE__ */ React.createElement("button", null, children);
  return children;
};
const safeExecute = (cb) => (...args) => {
  if (cb && typeof cb === "function") return cb(...args);
};
const getEnvVar = (name) => {
  return getEnvVariable(`VITE_${name}`) || getEnvVariable(name);
};
const withEnvFallback = (value, envVarName) => {
  if (value !== void 0) return value;
  return getEnvVar(envVarName) || void 0;
};
const mergeWithEnv = (options) => {
  const publishableKey = withEnvFallback(options.publishableKey, "CLERK_PUBLISHABLE_KEY");
  return {
    ...options,
    ...publishableKey !== void 0 && { publishableKey }
  };
};
function isConstructor(f) {
  return typeof f === "function";
}
const counts = /* @__PURE__ */ new Map();
function useMaxAllowedInstancesGuard(name, error, maxCount = 1) {
  React.useEffect(() => {
    const count = counts.get(name) || 0;
    if (count == maxCount) return errorThrower.throw(error);
    counts.set(name, count + 1);
    return () => {
      counts.set(name, (counts.get(name) || 1) - 1);
    };
  }, []);
}
function withMaxAllowedInstancesGuard(WrappedComponent, name, error) {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || name || "Component";
  const Hoc = (props) => {
    useMaxAllowedInstancesGuard(name, error);
    return /* @__PURE__ */ React.createElement(WrappedComponent, props);
  };
  Hoc.displayName = `withMaxAllowedInstancesGuard(${displayName})`;
  return Hoc;
}
const useCustomElementPortal = (elements) => {
  const [nodeMap, setNodeMap] = reactExports.useState(/* @__PURE__ */ new Map());
  const nodeMapRef = reactExports.useRef(nodeMap);
  const elementsRef = reactExports.useRef(/* @__PURE__ */ new Map());
  const portalsRef = reactExports.useRef(/* @__PURE__ */ new Map());
  nodeMapRef.current = nodeMap;
  elementsRef.current = new Map(elements.map((el) => [el.id, el.component]));
  const elementIds = new Set(elements.map((el) => el.id));
  portalsRef.current.forEach((_, id) => {
    if (!elementIds.has(id)) portalsRef.current.delete(id);
  });
  return elements.map((el) => {
    const id = el.id;
    const existingPortal = portalsRef.current.get(id);
    if (existingPortal) return existingPortal;
    const portal = () => {
      const node = nodeMapRef.current.get(id);
      const component = elementsRef.current.get(id);
      return node ? reactDomExports.createPortal(component, node) : null;
    };
    const customElementPortal = {
      id: el.id,
      mount: (node) => setNodeMap((prev) => new Map(prev).set(id, node)),
      unmount: () => setNodeMap((prev) => {
        const newMap = new Map(prev);
        newMap.set(id, null);
        return newMap;
      }),
      portal
    };
    portalsRef.current.set(id, customElementPortal);
    return customElementPortal;
  });
};
const isThatComponent = (v, component) => {
  return !!v && React.isValidElement(v) && v?.type === component;
};
const useUserProfileCustomPages = (children, options) => {
  return useCustomPages({
    children,
    reorderItemsLabels: [
      "account",
      "security",
      "billing",
      "apiKeys"
    ],
    LinkComponent: UserProfileLink,
    PageComponent: UserProfilePage,
    MenuItemsComponent: MenuItems,
    componentName: "UserProfile"
  }, options);
};
const useOrganizationProfileCustomPages = (children, options) => {
  return useCustomPages({
    children,
    reorderItemsLabels: [
      "general",
      "members",
      "billing",
      "apiKeys"
    ],
    LinkComponent: OrganizationProfileLink,
    PageComponent: OrganizationProfilePage,
    componentName: "OrganizationProfile"
  }, options);
};
const useSanitizedChildren = (children) => {
  const sanitizedChildren = [];
  const excludedComponents = [
    OrganizationProfileLink,
    OrganizationProfilePage,
    MenuItems,
    UserProfilePage,
    UserProfileLink
  ];
  React.Children.forEach(children, (child) => {
    if (!excludedComponents.some((component) => isThatComponent(child, component))) sanitizedChildren.push(child);
  });
  return sanitizedChildren;
};
const useCustomPages = (params, options) => {
  const { children, LinkComponent, PageComponent, MenuItemsComponent, reorderItemsLabels, componentName } = params;
  const { allowForAnyChildren = false } = options || {};
  const validChildren = [];
  const portalIdCounts = /* @__PURE__ */ new Map();
  React.Children.forEach(children, (child) => {
    if (!isThatComponent(child, PageComponent) && !isThatComponent(child, LinkComponent) && !isThatComponent(child, MenuItemsComponent)) {
      if (child && !allowForAnyChildren) logErrorInDevMode(customPagesIgnoredComponent(componentName));
      return;
    }
    const { props } = child;
    const { children: children2, label, url, labelIcon } = props;
    const childKey = child.key;
    if (isThatComponent(child, PageComponent)) if (isReorderItem$1(props, reorderItemsLabels)) validChildren.push({ label });
    else if (isCustomPage(props)) validChildren.push({
      label,
      labelIcon,
      children: children2,
      url,
      portalId: getCustomPagePortalId("page", props, childKey, portalIdCounts)
    });
    else {
      logErrorInDevMode(customPageWrongProps(componentName));
      return;
    }
    if (isThatComponent(child, LinkComponent)) if (isExternalLink$1(props)) validChildren.push({
      label,
      labelIcon,
      url,
      portalId: getCustomPagePortalId("link", props, childKey, portalIdCounts)
    });
    else {
      logErrorInDevMode(customLinkWrongProps(componentName));
      return;
    }
  });
  const customPageContents = [];
  const customPageLabelIcons = [];
  const customLinkLabelIcons = [];
  validChildren.forEach((cp, index) => {
    if (isCustomPage(cp)) {
      customPageContents.push({
        component: cp.children,
        id: cp.portalId || index
      });
      customPageLabelIcons.push({
        component: cp.labelIcon,
        id: cp.portalId || index
      });
      return;
    }
    if (isExternalLink$1(cp)) customLinkLabelIcons.push({
      component: cp.labelIcon,
      id: cp.portalId || index
    });
  });
  const customPageContentsPortals = useCustomElementPortal(customPageContents);
  const customPageLabelIconsPortals = useCustomElementPortal(customPageLabelIcons);
  const customLinkLabelIconsPortals = useCustomElementPortal(customLinkLabelIcons);
  const customPages = [];
  const customPagesPortals = [];
  validChildren.forEach((cp, index) => {
    if (isReorderItem$1(cp, reorderItemsLabels)) {
      customPages.push({ label: cp.label });
      return;
    }
    if (isCustomPage(cp)) {
      const { portal: contentPortal, mount, unmount } = customPageContentsPortals.find((p) => p.id === (cp.portalId || index));
      const { portal: labelPortal, mount: mountIcon, unmount: unmountIcon } = customPageLabelIconsPortals.find((p) => p.id === (cp.portalId || index));
      customPages.push({
        label: cp.label,
        url: cp.url,
        mount,
        unmount,
        mountIcon,
        unmountIcon
      });
      customPagesPortals.push({
        key: `content:${cp.portalId || index}`,
        portal: contentPortal
      });
      customPagesPortals.push({
        key: `label:${cp.portalId || index}`,
        portal: labelPortal
      });
      return;
    }
    if (isExternalLink$1(cp)) {
      const { portal: labelPortal, mount: mountIcon, unmount: unmountIcon } = customLinkLabelIconsPortals.find((p) => p.id === (cp.portalId || index));
      customPages.push({
        label: cp.label,
        url: cp.url,
        mountIcon,
        unmountIcon
      });
      customPagesPortals.push({
        key: `label:${cp.portalId || index}`,
        portal: labelPortal
      });
      return;
    }
  });
  return {
    customPages,
    customPagesPortals
  };
};
const getCustomPagePortalId = (type, props, key, portalIdCounts) => {
  if (key != null) return `${type}:key:${key}`;
  const baseId = `${type}:${props.label}:${props.url}`;
  const occurrence = portalIdCounts.get(baseId) ?? 0;
  portalIdCounts.set(baseId, occurrence + 1);
  return `${baseId}:${occurrence}`;
};
const isReorderItem$1 = (childProps, validItems) => {
  const { children, label, url, labelIcon } = childProps;
  return !children && !url && !labelIcon && validItems.some((v) => v === label);
};
const isCustomPage = (childProps) => {
  const { children, label, url, labelIcon } = childProps;
  return !!children && !!url && !!labelIcon && !!label;
};
const isExternalLink$1 = (childProps) => {
  const { children, label, url, labelIcon } = childProps;
  return !children && !!url && !!labelIcon && !!label;
};
const useUserButtonCustomMenuItems = (children, options) => {
  return useCustomMenuItems({
    children,
    reorderItemsLabels: ["manageAccount", "signOut"],
    MenuItemsComponent: MenuItems,
    MenuActionComponent: MenuAction,
    MenuLinkComponent: MenuLink,
    UserProfileLinkComponent: UserProfileLink,
    UserProfilePageComponent: UserProfilePage,
    allowForAnyChildren: options?.allowForAnyChildren ?? false
  });
};
const useCustomMenuItems = ({ children, MenuItemsComponent, MenuActionComponent, MenuLinkComponent, UserProfileLinkComponent, UserProfilePageComponent, reorderItemsLabels, allowForAnyChildren = false }) => {
  const validChildren = [];
  const customMenuItems = [];
  const customMenuItemsPortals = [];
  const portalIdCounts = /* @__PURE__ */ new Map();
  React.Children.forEach(children, (child) => {
    if (!isThatComponent(child, MenuItemsComponent) && !isThatComponent(child, UserProfileLinkComponent) && !isThatComponent(child, UserProfilePageComponent)) {
      if (child && !allowForAnyChildren) logErrorInDevMode(userButtonIgnoredComponent);
      return;
    }
    if (isThatComponent(child, UserProfileLinkComponent) || isThatComponent(child, UserProfilePageComponent)) return;
    const { props } = child;
    React.Children.forEach(props.children, (child2) => {
      if (!isThatComponent(child2, MenuActionComponent) && !isThatComponent(child2, MenuLinkComponent)) {
        if (child2) logErrorInDevMode(customMenuItemsIgnoredComponent);
        return;
      }
      const { props: props2 } = child2;
      const childKey = child2.key;
      const { label, labelIcon, href, onClick, open } = props2;
      if (isThatComponent(child2, MenuActionComponent)) if (isReorderItem(props2, reorderItemsLabels)) validChildren.push({ label });
      else if (isCustomMenuItem(props2)) {
        const baseItem = {
          label,
          labelIcon
        };
        if (onClick !== void 0) validChildren.push({
          ...baseItem,
          onClick,
          portalId: getCustomMenuItemPortalId("action", props2, childKey, portalIdCounts)
        });
        else if (open !== void 0) validChildren.push({
          ...baseItem,
          open: open.startsWith("/") ? open : `/${open}`,
          portalId: getCustomMenuItemPortalId("action", props2, childKey, portalIdCounts)
        });
        else {
          logErrorInDevMode("Custom menu item must have either onClick or open property");
          return;
        }
      } else {
        logErrorInDevMode(userButtonMenuItemsActionWrongsProps);
        return;
      }
      if (isThatComponent(child2, MenuLinkComponent)) if (isExternalLink(props2)) validChildren.push({
        label,
        labelIcon,
        href,
        portalId: getCustomMenuItemPortalId("link", props2, childKey, portalIdCounts)
      });
      else {
        logErrorInDevMode(userButtonMenuItemLinkWrongProps);
        return;
      }
    });
  });
  const customMenuItemLabelIcons = [];
  const customLinkLabelIcons = [];
  validChildren.forEach((mi, index) => {
    if (isCustomMenuItem(mi)) customMenuItemLabelIcons.push({
      component: mi.labelIcon,
      id: mi.portalId || index
    });
    if (isExternalLink(mi)) customLinkLabelIcons.push({
      component: mi.labelIcon,
      id: mi.portalId || index
    });
  });
  const customMenuItemLabelIconsPortals = useCustomElementPortal(customMenuItemLabelIcons);
  const customLinkLabelIconsPortals = useCustomElementPortal(customLinkLabelIcons);
  validChildren.forEach((mi, index) => {
    if (isReorderItem(mi, reorderItemsLabels)) customMenuItems.push({ label: mi.label });
    if (isCustomMenuItem(mi)) {
      const { portal: iconPortal, mount: mountIcon, unmount: unmountIcon } = customMenuItemLabelIconsPortals.find((p) => p.id === (mi.portalId || index));
      const menuItem = {
        label: mi.label,
        mountIcon,
        unmountIcon
      };
      if ("onClick" in mi) menuItem.onClick = mi.onClick;
      else if ("open" in mi) menuItem.open = mi.open;
      customMenuItems.push(menuItem);
      customMenuItemsPortals.push({
        key: `icon:${mi.portalId || index}`,
        portal: iconPortal
      });
    }
    if (isExternalLink(mi)) {
      const { portal: iconPortal, mount: mountIcon, unmount: unmountIcon } = customLinkLabelIconsPortals.find((p) => p.id === (mi.portalId || index));
      customMenuItems.push({
        label: mi.label,
        href: mi.href,
        mountIcon,
        unmountIcon
      });
      customMenuItemsPortals.push({
        key: `icon:${mi.portalId || index}`,
        portal: iconPortal
      });
    }
  });
  return {
    customMenuItems,
    customMenuItemsPortals
  };
};
const getCustomMenuItemPortalId = (type, props, key, portalIdCounts) => {
  if (key != null) return `${type}:key:${key}`;
  const target = props.href || props.open || "";
  const baseId = `${type}:${props.label}:${target}`;
  const occurrence = portalIdCounts.get(baseId) ?? 0;
  portalIdCounts.set(baseId, occurrence + 1);
  return `${baseId}:${occurrence}`;
};
const isReorderItem = (childProps, validItems) => {
  const { children, label, onClick, labelIcon } = childProps;
  return !children && !onClick && !labelIcon && validItems.some((v) => v === label);
};
const isCustomMenuItem = (childProps) => {
  const { label, labelIcon, onClick, open } = childProps;
  return !!labelIcon && !!label && (typeof onClick === "function" || typeof open === "string");
};
const isExternalLink = (childProps) => {
  const { label, href, labelIcon } = childProps;
  return !!href && !!labelIcon && !!label;
};
const createAwaitableMutationObserver = (globalOptions) => {
  const isReady = globalOptions?.isReady;
  return (options) => new Promise((resolve, reject) => {
    const { root = document?.body, selector, timeout = 0 } = options;
    if (!root) {
      reject(/* @__PURE__ */ new Error("No root element provided"));
      return;
    }
    let elementToWatch = root;
    if (selector) elementToWatch = root?.querySelector(selector);
    if (isReady(elementToWatch, selector)) {
      resolve();
      return;
    }
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (!elementToWatch && selector) elementToWatch = root?.querySelector(selector);
        if (globalOptions.childList && mutation.type === "childList" || globalOptions.attributes && mutation.type === "attributes") {
          if (isReady(elementToWatch, selector)) {
            observer.disconnect();
            resolve();
            return;
          }
        }
      }
    });
    observer.observe(root, globalOptions);
    if (timeout > 0) setTimeout(() => {
      observer.disconnect();
      reject(/* @__PURE__ */ new Error(`Timeout waiting for ${selector}`));
    }, timeout);
  });
};
const waitForElementChildren = createAwaitableMutationObserver({
  childList: true,
  subtree: true,
  isReady: (el, selector) => !!el?.childElementCount && el?.matches?.(selector) && el.childElementCount > 0
});
function useWaitForComponentMount(component, options) {
  const watcherRef = reactExports.useRef();
  const [status, setStatus] = reactExports.useState("rendering");
  reactExports.useEffect(() => {
    if (!component) throw new Error("Clerk: no component name provided, unable to detect mount.");
    if (typeof window !== "undefined" && !watcherRef.current) {
      const defaultSelector = `[data-clerk-component="${component}"]`;
      const selector = options?.selector;
      watcherRef.current = waitForElementChildren({ selector: selector ? defaultSelector + selector : defaultSelector }).then(() => {
        setStatus("rendered");
      }).catch(() => {
        setStatus("error");
      });
    }
  }, [component, options?.selector]);
  return status;
}
const isMountProps = (props) => {
  return "mount" in props;
};
const isOpenProps = (props) => {
  return "open" in props;
};
const stripMenuItemIconHandlers = (menuItems) => {
  return menuItems?.map(({ mountIcon, unmountIcon, ...rest }) => rest);
};
var ClerkHostRenderer = class extends React.PureComponent {
  constructor(..._args) {
    super(..._args);
    this.rootRef = React.createRef();
  }
  componentDidUpdate(_prevProps) {
    if (!isMountProps(_prevProps) || !isMountProps(this.props)) return;
    const prevProps = without(_prevProps.props || {}, "customPages", "customMenuItems", "children");
    const newProps = without(this.props.props || {}, "customPages", "customMenuItems", "children");
    const customPagesChanged = _prevProps.props?.customPages?.length !== this.props.props?.customPages?.length;
    const customMenuItemsChanged = _prevProps.props?.customMenuItems?.length !== this.props.props?.customMenuItems?.length;
    const prevMenuItemsWithoutHandlers = stripMenuItemIconHandlers(_prevProps.props?.customMenuItems);
    const newMenuItemsWithoutHandlers = stripMenuItemIconHandlers(this.props.props?.customMenuItems);
    if (!isDeeplyEqual(prevProps, newProps) || !isDeeplyEqual(prevMenuItemsWithoutHandlers, newMenuItemsWithoutHandlers) || customPagesChanged || customMenuItemsChanged) {
      if (this.rootRef.current) this.props.updateProps({
        node: this.rootRef.current,
        props: this.props.props
      });
    }
  }
  componentDidMount() {
    if (this.rootRef.current) {
      if (isMountProps(this.props)) this.props.mount(this.rootRef.current, this.props.props);
      if (isOpenProps(this.props)) this.props.open(this.props.props);
    }
  }
  componentWillUnmount() {
    if (this.rootRef.current) {
      if (isMountProps(this.props)) this.props.unmount(this.rootRef.current);
      if (isOpenProps(this.props)) this.props.close();
    }
  }
  render() {
    const { hideRootHtmlElement = false } = this.props;
    const rootAttributes = {
      ref: this.rootRef,
      ...this.props.rootProps,
      ...this.props.component && { "data-clerk-component": this.props.component }
    };
    return /* @__PURE__ */ React.createElement(React.Fragment, null, !hideRootHtmlElement && /* @__PURE__ */ React.createElement("div", rootAttributes), this.props.children);
  }
};
const withClerk = (Component, displayNameOrOptions) => {
  const displayName = (typeof displayNameOrOptions === "string" ? displayNameOrOptions : displayNameOrOptions?.component) || Component.displayName || Component.name || "Component";
  Component.displayName = displayName;
  const options = typeof displayNameOrOptions === "string" ? void 0 : displayNameOrOptions;
  const HOC = (props) => {
    useAssertWrappedByClerkProvider$1(displayName || "withClerk");
    const clerk = useIsomorphicClerkContext();
    const getContainer = usePortalRoot();
    if (!clerk.loaded && !options?.renderWhileLoading) return null;
    return /* @__PURE__ */ React.createElement(Component, {
      getContainer,
      ...props,
      component: displayName,
      clerk
    });
  };
  HOC.displayName = `withClerk(${displayName})`;
  return HOC;
};
const CustomPortalsRenderer = (props) => {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, props?.customPagesPortals?.map(({ key, portal }) => reactExports.createElement(portal, { key })), props?.customMenuItemsPortals?.map(({ key, portal }) => reactExports.createElement(portal, { key })));
};
const SignIn = withClerk(({ clerk, component, fallback, ...props }) => {
  const shouldShowFallback = useWaitForComponentMount(component) === "rendering" || !clerk.loaded;
  const rendererRootProps = { ...shouldShowFallback && fallback && { style: { display: "none" } } };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, shouldShowFallback && fallback, clerk.loaded && /* @__PURE__ */ React.createElement(ClerkHostRenderer, {
    component,
    mount: clerk.mountSignIn,
    unmount: clerk.unmountSignIn,
    updateProps: clerk.__internal_updateProps,
    props,
    rootProps: rendererRootProps
  }));
}, {
  component: "SignIn",
  renderWhileLoading: true
});
const SignUp = withClerk(({ clerk, component, fallback, ...props }) => {
  const shouldShowFallback = useWaitForComponentMount(component) === "rendering" || !clerk.loaded;
  const rendererRootProps = { ...shouldShowFallback && fallback && { style: { display: "none" } } };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, shouldShowFallback && fallback, clerk.loaded && /* @__PURE__ */ React.createElement(ClerkHostRenderer, {
    component,
    mount: clerk.mountSignUp,
    unmount: clerk.unmountSignUp,
    updateProps: clerk.__internal_updateProps,
    props,
    rootProps: rendererRootProps
  }));
}, {
  component: "SignUp",
  renderWhileLoading: true
});
function UserProfilePage({ children }) {
  logErrorInDevMode(userProfilePageRenderedError);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, children);
}
function UserProfileLink({ children }) {
  logErrorInDevMode(userProfileLinkRenderedError);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, children);
}
const _UserProfile = withClerk(({ clerk, component, fallback, ...props }) => {
  const shouldShowFallback = useWaitForComponentMount(component) === "rendering" || !clerk.loaded;
  const rendererRootProps = { ...shouldShowFallback && fallback && { style: { display: "none" } } };
  const { customPages, customPagesPortals } = useUserProfileCustomPages(props.children);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, shouldShowFallback && fallback, /* @__PURE__ */ React.createElement(ClerkHostRenderer, {
    component,
    mount: clerk.mountUserProfile,
    unmount: clerk.unmountUserProfile,
    updateProps: clerk.__internal_updateProps,
    props: {
      ...props,
      customPages
    },
    rootProps: rendererRootProps
  }, /* @__PURE__ */ React.createElement(CustomPortalsRenderer, { customPagesPortals })));
}, {
  component: "UserProfile",
  renderWhileLoading: true
});
const UserProfile = Object.assign(_UserProfile, {
  Page: UserProfilePage,
  Link: UserProfileLink
});
const UserButtonContext = reactExports.createContext({
  mount: () => {
  },
  unmount: () => {
  },
  updateProps: () => {
  }
});
const _UserButton = withClerk(({ clerk, component, fallback, ...props }) => {
  const shouldShowFallback = useWaitForComponentMount(component) === "rendering" || !clerk.loaded;
  const rendererRootProps = { ...shouldShowFallback && fallback && { style: { display: "none" } } };
  const { customPages, customPagesPortals } = useUserProfileCustomPages(props.children, { allowForAnyChildren: !!props.__experimental_asProvider });
  const userProfileProps = {
    ...props.userProfileProps,
    customPages
  };
  const { customMenuItems, customMenuItemsPortals } = useUserButtonCustomMenuItems(props.children, { allowForAnyChildren: !!props.__experimental_asProvider });
  const sanitizedChildren = useSanitizedChildren(props.children);
  const passableProps = {
    mount: clerk.mountUserButton,
    unmount: clerk.unmountUserButton,
    updateProps: clerk.__internal_updateProps,
    props: {
      ...props,
      userProfileProps,
      customMenuItems
    }
  };
  const portalProps = {
    customPagesPortals,
    customMenuItemsPortals
  };
  return /* @__PURE__ */ React.createElement(UserButtonContext.Provider, { value: passableProps }, shouldShowFallback && fallback, clerk.loaded && /* @__PURE__ */ React.createElement(ClerkHostRenderer, {
    component,
    ...passableProps,
    hideRootHtmlElement: !!props.__experimental_asProvider,
    rootProps: rendererRootProps
  }, props.__experimental_asProvider ? sanitizedChildren : null, /* @__PURE__ */ React.createElement(CustomPortalsRenderer, portalProps)));
}, {
  component: "UserButton",
  renderWhileLoading: true
});
function MenuItems({ children }) {
  logErrorInDevMode(userButtonMenuItemsRenderedError);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, children);
}
function MenuAction({ children }) {
  logErrorInDevMode(userButtonMenuActionRenderedError);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, children);
}
function MenuLink({ children }) {
  logErrorInDevMode(userButtonMenuLinkRenderedError);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, children);
}
function UserButtonOutlet(outletProps) {
  const providerProps = reactExports.useContext(UserButtonContext);
  const portalProps = {
    ...providerProps,
    props: {
      ...providerProps.props,
      ...outletProps
    }
  };
  return /* @__PURE__ */ React.createElement(ClerkHostRenderer, portalProps);
}
const UserButton = Object.assign(_UserButton, {
  UserProfilePage,
  UserProfileLink,
  MenuItems,
  Action: MenuAction,
  Link: MenuLink,
  __experimental_Outlet: UserButtonOutlet
});
function OrganizationProfilePage({ children }) {
  logErrorInDevMode(organizationProfilePageRenderedError);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, children);
}
function OrganizationProfileLink({ children }) {
  logErrorInDevMode(organizationProfileLinkRenderedError);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, children);
}
const _OrganizationProfile = withClerk(({ clerk, component, fallback, ...props }) => {
  const shouldShowFallback = useWaitForComponentMount(component) === "rendering" || !clerk.loaded;
  const rendererRootProps = { ...shouldShowFallback && fallback && { style: { display: "none" } } };
  const { customPages, customPagesPortals } = useOrganizationProfileCustomPages(props.children);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, shouldShowFallback && fallback, clerk.loaded && /* @__PURE__ */ React.createElement(ClerkHostRenderer, {
    component,
    mount: clerk.mountOrganizationProfile,
    unmount: clerk.unmountOrganizationProfile,
    updateProps: clerk.__internal_updateProps,
    props: {
      ...props,
      customPages
    },
    rootProps: rendererRootProps
  }, /* @__PURE__ */ React.createElement(CustomPortalsRenderer, { customPagesPortals })));
}, {
  component: "OrganizationProfile",
  renderWhileLoading: true
});
const OrganizationProfile = Object.assign(_OrganizationProfile, {
  Page: OrganizationProfilePage,
  Link: OrganizationProfileLink
});
withClerk(({ clerk, component, fallback, ...props }) => {
  const shouldShowFallback = useWaitForComponentMount(component) === "rendering" || !clerk.loaded;
  const rendererRootProps = { ...shouldShowFallback && fallback && { style: { display: "none" } } };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, shouldShowFallback && fallback, clerk.loaded && /* @__PURE__ */ React.createElement(ClerkHostRenderer, {
    component,
    mount: clerk.mountCreateOrganization,
    unmount: clerk.unmountCreateOrganization,
    updateProps: clerk.__internal_updateProps,
    props,
    rootProps: rendererRootProps
  }));
}, {
  component: "CreateOrganization",
  renderWhileLoading: true
});
const OrganizationSwitcherContext = reactExports.createContext({
  mount: () => {
  },
  unmount: () => {
  },
  updateProps: () => {
  }
});
const _OrganizationSwitcher = withClerk(({ clerk, component, fallback, ...props }) => {
  const shouldShowFallback = useWaitForComponentMount(component) === "rendering" || !clerk.loaded;
  const rendererRootProps = { ...shouldShowFallback && fallback && { style: { display: "none" } } };
  const { customPages, customPagesPortals } = useOrganizationProfileCustomPages(props.children, { allowForAnyChildren: !!props.__experimental_asProvider });
  const organizationProfileProps = {
    ...props.organizationProfileProps,
    customPages
  };
  const sanitizedChildren = useSanitizedChildren(props.children);
  const passableProps = {
    mount: clerk.mountOrganizationSwitcher,
    unmount: clerk.unmountOrganizationSwitcher,
    updateProps: clerk.__internal_updateProps,
    props: {
      ...props,
      organizationProfileProps
    },
    rootProps: rendererRootProps,
    component
  };
  clerk.__experimental_prefetchOrganizationSwitcher();
  return /* @__PURE__ */ React.createElement(OrganizationSwitcherContext.Provider, { value: passableProps }, /* @__PURE__ */ React.createElement(React.Fragment, null, shouldShowFallback && fallback, clerk.loaded && /* @__PURE__ */ React.createElement(ClerkHostRenderer, {
    ...passableProps,
    hideRootHtmlElement: !!props.__experimental_asProvider
  }, props.__experimental_asProvider ? sanitizedChildren : null, /* @__PURE__ */ React.createElement(CustomPortalsRenderer, { customPagesPortals }))));
}, {
  component: "OrganizationSwitcher",
  renderWhileLoading: true
});
function OrganizationSwitcherOutlet(outletProps) {
  const providerProps = reactExports.useContext(OrganizationSwitcherContext);
  const portalProps = {
    ...providerProps,
    props: {
      ...providerProps.props,
      ...outletProps
    }
  };
  return /* @__PURE__ */ React.createElement(ClerkHostRenderer, portalProps);
}
Object.assign(_OrganizationSwitcher, {
  OrganizationProfilePage,
  OrganizationProfileLink,
  __experimental_Outlet: OrganizationSwitcherOutlet
});
const OrganizationList = withClerk(({ clerk, component, fallback, ...props }) => {
  const shouldShowFallback = useWaitForComponentMount(component) === "rendering" || !clerk.loaded;
  const rendererRootProps = { ...shouldShowFallback && fallback && { style: { display: "none" } } };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, shouldShowFallback && fallback, clerk.loaded && /* @__PURE__ */ React.createElement(ClerkHostRenderer, {
    component,
    mount: clerk.mountOrganizationList,
    unmount: clerk.unmountOrganizationList,
    updateProps: clerk.__internal_updateProps,
    props,
    rootProps: rendererRootProps
  }));
}, {
  component: "OrganizationList",
  renderWhileLoading: true
});
withClerk(({ clerk, component, fallback, ...props }) => {
  const shouldShowFallback = useWaitForComponentMount(component) === "rendering" || !clerk.loaded;
  const rendererRootProps = { ...shouldShowFallback && fallback && { style: { display: "none" } } };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, shouldShowFallback && fallback, clerk.loaded && /* @__PURE__ */ React.createElement(ClerkHostRenderer, {
    component,
    open: clerk.openGoogleOneTap,
    close: clerk.closeGoogleOneTap,
    updateProps: clerk.__internal_updateProps,
    props,
    rootProps: rendererRootProps
  }));
}, {
  component: "GoogleOneTap",
  renderWhileLoading: true
});
withClerk(({ clerk, component, fallback, ...props }) => {
  const shouldShowFallback = useWaitForComponentMount(component) === "rendering" || !clerk.loaded;
  const rendererRootProps = { ...shouldShowFallback && fallback && { style: { display: "none" } } };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, shouldShowFallback && fallback, clerk.loaded && /* @__PURE__ */ React.createElement(ClerkHostRenderer, {
    component,
    mount: clerk.mountWaitlist,
    unmount: clerk.unmountWaitlist,
    updateProps: clerk.__internal_updateProps,
    props,
    rootProps: rendererRootProps
  }));
}, {
  component: "Waitlist",
  renderWhileLoading: true
});
withClerk(({ clerk, component, fallback, ...props }) => {
  const shouldShowFallback = useWaitForComponentMount(component, { selector: '[data-component-status="ready"]' }) === "rendering" || !clerk.loaded;
  const rendererRootProps = { ...shouldShowFallback && fallback && { style: { display: "none" } } };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, shouldShowFallback && fallback, clerk.loaded && /* @__PURE__ */ React.createElement(ClerkHostRenderer, {
    component,
    mount: clerk.mountPricingTable,
    unmount: clerk.unmountPricingTable,
    updateProps: clerk.__internal_updateProps,
    props,
    rootProps: rendererRootProps
  }));
}, {
  component: "PricingTable",
  renderWhileLoading: true
});
withClerk(({ clerk, component, fallback, ...props }) => {
  const shouldShowFallback = useWaitForComponentMount(component) === "rendering" || !clerk.loaded;
  const rendererRootProps = { ...shouldShowFallback && fallback && { style: { display: "none" } } };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, shouldShowFallback && fallback, clerk.loaded && /* @__PURE__ */ React.createElement(ClerkHostRenderer, {
    component,
    mount: clerk.mountAPIKeys,
    unmount: clerk.unmountAPIKeys,
    updateProps: clerk.__internal_updateProps,
    props,
    rootProps: rendererRootProps
  }));
}, {
  component: "ApiKeys",
  renderWhileLoading: true
});
withClerk(({ clerk, component, fallback, ...props }) => {
  const shouldShowFallback = useWaitForComponentMount(component) === "rendering" || !clerk.loaded;
  const rendererRootProps = { ...shouldShowFallback && fallback && { style: { display: "none" } } };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, shouldShowFallback && fallback, clerk.loaded && /* @__PURE__ */ React.createElement(ClerkHostRenderer, {
    component,
    mount: clerk.__internal_mountOAuthConsent,
    unmount: clerk.__internal_unmountOAuthConsent,
    updateProps: clerk.__internal_updateProps,
    props,
    rootProps: rendererRootProps
  }));
}, {
  component: "OAuthConsent",
  renderWhileLoading: true
});
withClerk(({ clerk, component, fallback, ...props }) => {
  const shouldShowFallback = useWaitForComponentMount(component) === "rendering" || !clerk.loaded;
  const rendererRootProps = { ...shouldShowFallback && fallback && { style: { display: "none" } } };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, shouldShowFallback && fallback, clerk.loaded && /* @__PURE__ */ React.createElement(ClerkHostRenderer, {
    component,
    mount: clerk.mountUserAvatar,
    unmount: clerk.unmountUserAvatar,
    updateProps: clerk.__internal_updateProps,
    props,
    rootProps: rendererRootProps
  }));
}, {
  component: "UserAvatar",
  renderWhileLoading: true
});
withClerk(({ clerk, component, fallback, ...props }) => {
  const shouldShowFallback = useWaitForComponentMount(component) === "rendering" || !clerk.loaded;
  const rendererRootProps = { ...shouldShowFallback && fallback && { style: { display: "none" } } };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, shouldShowFallback && fallback, clerk.loaded && /* @__PURE__ */ React.createElement(ClerkHostRenderer, {
    component,
    mount: clerk.mountTaskChooseOrganization,
    unmount: clerk.unmountTaskChooseOrganization,
    updateProps: clerk.__internal_updateProps,
    props,
    rootProps: rendererRootProps
  }));
}, {
  component: "TaskChooseOrganization",
  renderWhileLoading: true
});
withClerk(({ clerk, component, fallback, ...props }) => {
  const shouldShowFallback = useWaitForComponentMount(component) === "rendering" || !clerk.loaded;
  const rendererRootProps = { ...shouldShowFallback && fallback && { style: { display: "none" } } };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, shouldShowFallback && fallback, clerk.loaded && /* @__PURE__ */ React.createElement(ClerkHostRenderer, {
    component,
    mount: clerk.mountTaskResetPassword,
    unmount: clerk.unmountTaskResetPassword,
    updateProps: clerk.__internal_updateProps,
    props,
    rootProps: rendererRootProps
  }));
}, {
  component: "TaskResetPassword",
  renderWhileLoading: true
});
withClerk(({ clerk, component, fallback, ...props }) => {
  const shouldShowFallback = useWaitForComponentMount(component) === "rendering" || !clerk.loaded;
  const rendererRootProps = { ...shouldShowFallback && fallback && { style: { display: "none" } } };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, shouldShowFallback && fallback, clerk.loaded && /* @__PURE__ */ React.createElement(ClerkHostRenderer, {
    component,
    mount: clerk.mountTaskSetupMFA,
    unmount: clerk.unmountTaskSetupMFA,
    updateProps: clerk.__internal_updateProps,
    props,
    rootProps: rendererRootProps
  }));
}, {
  component: "TaskSetupMFA",
  renderWhileLoading: true
});
const defaultDerivedInitialState = {
  actor: void 0,
  factorVerificationAge: null,
  orgId: void 0,
  orgPermissions: void 0,
  orgRole: void 0,
  orgSlug: void 0,
  sessionClaims: void 0,
  sessionId: void 0,
  sessionStatus: void 0,
  userId: void 0
};
function useAuthBase() {
  const clerk = useClerkInstanceContext();
  const initialState = useInitialStateContext();
  const getInitialState = reactExports.useCallback(() => initialState, [initialState]);
  const state = reactExports.useSyncExternalStore(reactExports.useCallback((callback) => clerk.addListener(callback, { skipInitialEmit: true }), [clerk]), reactExports.useCallback(() => {
    if (!clerk.loaded || !clerk.__internal_lastEmittedResources) return getInitialState();
    return clerk.__internal_lastEmittedResources;
  }, [clerk, getInitialState]), getInitialState);
  return reactExports.useMemo(() => {
    if (!state) return defaultDerivedInitialState;
    return authStateFromFull(isInitialState(state) ? deriveState(false, {}, state) : deriveState(true, state, void 0));
  }, [state]);
}
function authStateFromFull(derivedState) {
  return {
    sessionId: derivedState.sessionId,
    sessionStatus: derivedState.sessionStatus,
    sessionClaims: derivedState.sessionClaims,
    userId: derivedState.userId,
    actor: derivedState.actor,
    orgId: derivedState.orgId,
    orgRole: derivedState.orgRole,
    orgSlug: derivedState.orgSlug,
    orgPermissions: derivedState.orgPermissions,
    factorVerificationAge: derivedState.factorVerificationAge
  };
}
function isInitialState(state) {
  return !("client" in state);
}
const clerkLoaded = (isomorphicClerk) => {
  return new Promise((resolve) => {
    const handler = (status) => {
      if (["ready", "degraded"].includes(status)) {
        resolve();
        isomorphicClerk.off("status", handler);
      }
    };
    isomorphicClerk.on("status", handler, { notify: true });
  });
};
const createGetToken = (isomorphicClerk) => {
  return async (options) => {
    if (!inBrowser()) throw new ClerkRuntimeError("useAuth().getToken() can only be used in browser environments. To access auth data server-side, see the Auth object reference doc: https://clerk.com/docs/reference/backend/types/auth-object", { code: "clerk_runtime_not_browser" });
    await clerkLoaded(isomorphicClerk);
    if (!isomorphicClerk.session) return null;
    return isomorphicClerk.session.getToken(options);
  };
};
const createSignOut = (isomorphicClerk) => {
  return async (...args) => {
    await clerkLoaded(isomorphicClerk);
    return isomorphicClerk.signOut(...args);
  };
};
const useAuth = (options = {}) => {
  useAssertWrappedByClerkProvider$1("useAuth");
  const { treatPendingAsSignedOut } = options ?? {};
  const authState = useAuthBase();
  const isomorphicClerk = useIsomorphicClerkContext();
  const getToken = reactExports.useCallback(createGetToken(isomorphicClerk), [isomorphicClerk]);
  const signOut = reactExports.useCallback(createSignOut(isomorphicClerk), [isomorphicClerk]);
  isomorphicClerk.telemetry?.record(eventMethodCalled("useAuth", { treatPendingAsSignedOut }));
  return useDerivedAuth({
    ...authState,
    getToken,
    signOut
  }, { treatPendingAsSignedOut });
};
function useDerivedAuth(authObject, { treatPendingAsSignedOut = true } = {}) {
  const { userId, orgId, orgRole, has, signOut, getToken, orgPermissions, factorVerificationAge, sessionClaims } = authObject ?? {};
  const derivedHas = reactExports.useCallback((params) => {
    if (has) return has(params);
    return createCheckAuthorization({
      userId,
      orgId,
      orgRole,
      orgPermissions,
      factorVerificationAge,
      features: sessionClaims?.fea || "",
      plans: sessionClaims?.pla || ""
    })(params);
  }, [
    has,
    userId,
    orgId,
    orgRole,
    orgPermissions,
    factorVerificationAge,
    sessionClaims
  ]);
  const payload = resolveAuthState({
    authObject: {
      ...authObject,
      getToken,
      signOut,
      has: derivedHas
    },
    options: { treatPendingAsSignedOut }
  });
  if (!payload) return errorThrower.throw(invalidStateError);
  return payload;
}
withClerk(({ clerk, ...props }) => {
  const { client, session } = clerk;
  const hasSignedInSessions = (client.signedInSessions?.length ?? 0) > 0;
  React.useEffect(() => {
    if (session === null && hasSignedInSessions) clerk.redirectToAfterSignOut();
    else clerk.redirectToSignIn(props);
  }, []);
  return null;
}, "RedirectToSignIn");
withClerk(({ clerk, ...props }) => {
  React.useEffect(() => {
    clerk.redirectToSignUp(props);
  }, []);
  return null;
}, "RedirectToSignUp");
withClerk(({ clerk, ...props }) => {
  React.useEffect(() => {
    clerk.redirectToTasks(props);
  }, []);
  return null;
}, "RedirectToTasks");
withClerk(({ clerk }) => {
  React.useEffect(() => {
    deprecated("RedirectToUserProfile", "Use the `redirectToUserProfile()` method instead.");
    clerk.redirectToUserProfile();
  }, []);
  return null;
}, "RedirectToUserProfile");
withClerk(({ clerk }) => {
  React.useEffect(() => {
    deprecated("RedirectToOrganizationProfile", "Use the `redirectToOrganizationProfile()` method instead.");
    clerk.redirectToOrganizationProfile();
  }, []);
  return null;
}, "RedirectToOrganizationProfile");
withClerk(({ clerk }) => {
  React.useEffect(() => {
    deprecated("RedirectToCreateOrganization", "Use the `redirectToCreateOrganization()` method instead.");
    clerk.redirectToCreateOrganization();
  }, []);
  return null;
}, "RedirectToCreateOrganization");
withClerk(({ clerk, ...handleRedirectCallbackParams }) => {
  React.useEffect(() => {
    clerk.handleRedirectCallback(handleRedirectCallbackParams);
  }, []);
  return null;
}, "AuthenticateWithRedirectCallback");
const defaultSignInErrors = () => ({
  fields: {
    identifier: null,
    password: null,
    code: null
  },
  raw: null,
  global: null
});
const defaultSignUpErrors = () => ({
  fields: {
    firstName: null,
    lastName: null,
    emailAddress: null,
    phoneNumber: null,
    password: null,
    username: null,
    code: null,
    captcha: null,
    legalAccepted: null
  },
  raw: null,
  global: null
});
const defaultWaitlistErrors = () => ({
  fields: { emailAddress: null },
  raw: null,
  global: null
});
const defaultVerificationResource = () => ({
  pathRoot: "",
  attempts: null,
  error: null,
  expireAt: null,
  externalVerificationRedirectURL: null,
  nonce: null,
  message: null,
  status: null,
  strategy: null,
  verifiedAtClient: null,
  verifiedFromTheSameClient() {
    return false;
  },
  reload() {
    throw new Error("reload() called before Clerk is loaded");
  },
  __internal_toSnapshot() {
    return {
      object: "verification",
      id: "",
      attempts: null,
      error: {
        code: "",
        message: ""
      },
      expire_at: null,
      externalVerificationRedirectURL: null,
      nonce: null,
      message: null,
      status: null,
      strategy: null,
      verified_at_client: null
    };
  }
});
const defaultSignUpVerificationResource = () => ({
  ...defaultVerificationResource(),
  supportedStrategies: [],
  nextAction: "",
  reload() {
    throw new Error("reload() called before Clerk is loaded");
  },
  __internal_toSnapshot() {
    return {
      ...defaultVerificationResource().__internal_toSnapshot(),
      next_action: this.nextAction,
      supported_strategies: this.supportedStrategies
    };
  }
});
var StateProxy = class {
  constructor(isomorphicClerk) {
    this.isomorphicClerk = isomorphicClerk;
    this.signInSignalProxy = this.buildSignInProxy();
    this.signUpSignalProxy = this.buildSignUpProxy();
    this.waitlistSignalProxy = this.buildWaitlistProxy();
  }
  signInSignal() {
    return this.signInSignalProxy;
  }
  signUpSignal() {
    return this.signUpSignalProxy;
  }
  waitlistSignal() {
    return this.waitlistSignalProxy;
  }
  get __internal_waitlist() {
    return this.state.__internal_waitlist;
  }
  checkoutSignal(params) {
    return this.buildCheckoutProxy(params);
  }
  buildSignInProxy() {
    const gateProperty = this.gateProperty.bind(this);
    const target = () => this.client.signIn.__internal_future;
    return {
      errors: defaultSignInErrors(),
      fetchStatus: "idle",
      signIn: {
        status: "needs_identifier",
        availableStrategies: [],
        get isTransferable() {
          return gateProperty(target, "isTransferable", false);
        },
        get id() {
          return gateProperty(target, "id", void 0);
        },
        get supportedFirstFactors() {
          return gateProperty(target, "supportedFirstFactors", []);
        },
        get supportedSecondFactors() {
          return gateProperty(target, "supportedSecondFactors", []);
        },
        get secondFactorVerification() {
          return gateProperty(target, "secondFactorVerification", {
            status: null,
            error: null,
            expireAt: null,
            externalVerificationRedirectURL: null,
            nonce: null,
            attempts: null,
            message: null,
            strategy: null,
            verifiedAtClient: null,
            verifiedFromTheSameClient: () => false,
            __internal_toSnapshot: () => {
              throw new Error("__internal_toSnapshot called before Clerk is loaded");
            },
            pathRoot: "",
            reload: () => {
              throw new Error("__internal_toSnapshot called before Clerk is loaded");
            }
          });
        },
        get identifier() {
          return gateProperty(target, "identifier", null);
        },
        get createdSessionId() {
          return gateProperty(target, "createdSessionId", null);
        },
        get userData() {
          return gateProperty(target, "userData", {});
        },
        get firstFactorVerification() {
          return gateProperty(target, "firstFactorVerification", {
            status: null,
            error: null,
            expireAt: null,
            externalVerificationRedirectURL: null,
            nonce: null,
            attempts: null,
            message: null,
            strategy: null,
            verifiedAtClient: null,
            verifiedFromTheSameClient: () => false,
            __internal_toSnapshot: () => {
              throw new Error("__internal_toSnapshot called before Clerk is loaded");
            },
            pathRoot: "",
            reload: () => {
              throw new Error("__internal_toSnapshot called before Clerk is loaded");
            }
          });
        },
        get canBeDiscarded() {
          return gateProperty(target, "canBeDiscarded", false);
        },
        create: this.gateMethod(target, "create"),
        password: this.gateMethod(target, "password"),
        sso: this.gateMethod(target, "sso"),
        finalize: this.gateMethod(target, "finalize"),
        reset: this.gateMethod(target, "reset"),
        emailCode: this.wrapMethods(() => target().emailCode, ["sendCode", "verifyCode"]),
        emailLink: this.wrapStruct(() => target().emailLink, ["sendLink", "waitForVerification"], ["verification"], { verification: null }),
        resetPasswordEmailCode: this.wrapMethods(() => target().resetPasswordEmailCode, [
          "sendCode",
          "verifyCode",
          "submitPassword"
        ]),
        resetPasswordPhoneCode: this.wrapMethods(() => target().resetPasswordPhoneCode, [
          "sendCode",
          "verifyCode",
          "submitPassword"
        ]),
        phoneCode: this.wrapMethods(() => target().phoneCode, ["sendCode", "verifyCode"]),
        mfa: this.wrapMethods(() => target().mfa, [
          "sendPhoneCode",
          "verifyPhoneCode",
          "sendEmailCode",
          "verifyEmailCode",
          "verifyTOTP",
          "verifyBackupCode"
        ]),
        ticket: this.gateMethod(target, "ticket"),
        passkey: this.gateMethod(target, "passkey"),
        web3: this.gateMethod(target, "web3")
      }
    };
  }
  buildSignUpProxy() {
    const gateProperty = this.gateProperty.bind(this);
    const gateMethod = this.gateMethod.bind(this);
    const target = () => this.client.signUp.__internal_future;
    return {
      errors: defaultSignUpErrors(),
      fetchStatus: "idle",
      signUp: {
        get id() {
          return gateProperty(target, "id", void 0);
        },
        get requiredFields() {
          return gateProperty(target, "requiredFields", []);
        },
        get optionalFields() {
          return gateProperty(target, "optionalFields", []);
        },
        get missingFields() {
          return gateProperty(target, "missingFields", []);
        },
        get username() {
          return gateProperty(target, "username", null);
        },
        get firstName() {
          return gateProperty(target, "firstName", null);
        },
        get lastName() {
          return gateProperty(target, "lastName", null);
        },
        get emailAddress() {
          return gateProperty(target, "emailAddress", null);
        },
        get phoneNumber() {
          return gateProperty(target, "phoneNumber", null);
        },
        get web3Wallet() {
          return gateProperty(target, "web3Wallet", null);
        },
        get hasPassword() {
          return gateProperty(target, "hasPassword", false);
        },
        get unsafeMetadata() {
          return gateProperty(target, "unsafeMetadata", {});
        },
        get createdSessionId() {
          return gateProperty(target, "createdSessionId", null);
        },
        get createdUserId() {
          return gateProperty(target, "createdUserId", null);
        },
        get abandonAt() {
          return gateProperty(target, "abandonAt", null);
        },
        get legalAcceptedAt() {
          return gateProperty(target, "legalAcceptedAt", null);
        },
        get locale() {
          return gateProperty(target, "locale", null);
        },
        get status() {
          return gateProperty(target, "status", "missing_requirements");
        },
        get unverifiedFields() {
          return gateProperty(target, "unverifiedFields", []);
        },
        get isTransferable() {
          return gateProperty(target, "isTransferable", false);
        },
        get canBeDiscarded() {
          return gateProperty(target, "canBeDiscarded", false);
        },
        create: gateMethod(target, "create"),
        update: gateMethod(target, "update"),
        sso: gateMethod(target, "sso"),
        password: gateMethod(target, "password"),
        ticket: gateMethod(target, "ticket"),
        web3: gateMethod(target, "web3"),
        finalize: gateMethod(target, "finalize"),
        reset: gateMethod(target, "reset"),
        verifications: this.wrapStruct(() => target().verifications, [
          "sendEmailCode",
          "verifyEmailCode",
          "sendEmailLink",
          "waitForEmailLinkVerification",
          "sendPhoneCode",
          "verifyPhoneCode"
        ], [
          "emailAddress",
          "phoneNumber",
          "web3Wallet",
          "externalAccount",
          "emailLinkVerification"
        ], {
          emailAddress: defaultSignUpVerificationResource(),
          phoneNumber: defaultSignUpVerificationResource(),
          web3Wallet: defaultSignUpVerificationResource(),
          externalAccount: defaultSignUpVerificationResource(),
          emailLinkVerification: null
        })
      }
    };
  }
  buildWaitlistProxy() {
    const gateProperty = this.gateProperty.bind(this);
    const gateMethod = this.gateMethod.bind(this);
    const target = () => {
      return this.state.__internal_waitlist;
    };
    return {
      errors: defaultWaitlistErrors(),
      fetchStatus: "idle",
      waitlist: {
        pathRoot: "/waitlist",
        get id() {
          return gateProperty(target, "id", "");
        },
        get createdAt() {
          return gateProperty(target, "createdAt", null);
        },
        get updatedAt() {
          return gateProperty(target, "updatedAt", null);
        },
        join: gateMethod(target, "join"),
        reload: gateMethod(target, "reload")
      }
    };
  }
  buildCheckoutProxy(params) {
    const gateProperty = this.gateProperty.bind(this);
    const targetCheckout = () => this.checkout(params);
    const target = () => targetCheckout().checkout;
    return {
      errors: {
        raw: null,
        global: null
      },
      fetchStatus: "idle",
      checkout: {
        get status() {
          return gateProperty(target, "status", "needs_initialization");
        },
        get externalClientSecret() {
          return gateProperty(target, "externalClientSecret", null);
        },
        get externalGatewayId() {
          return gateProperty(target, "externalGatewayId", null);
        },
        get paymentMethod() {
          return gateProperty(target, "paymentMethod", null);
        },
        get plan() {
          return gateProperty(target, "plan", null);
        },
        get planPeriod() {
          return gateProperty(target, "planPeriod", null);
        },
        get totals() {
          return gateProperty(target, "totals", null);
        },
        get isImmediatePlanChange() {
          return gateProperty(target, "isImmediatePlanChange", false);
        },
        get freeTrialEndsAt() {
          return gateProperty(target, "freeTrialEndsAt", null);
        },
        get payer() {
          return gateProperty(target, "payer", null);
        },
        get planPeriodStart() {
          return gateProperty(target, "planPeriodStart", null);
        },
        get needsPaymentMethod() {
          return gateProperty(target, "needsPaymentMethod", null);
        },
        start: this.gateMethod(target, "start"),
        confirm: this.gateMethod(target, "confirm"),
        finalize: this.gateMethod(target, "finalize")
      }
    };
  }
  __internal_effect(_) {
    throw new Error("__internal_effect called before Clerk is loaded");
  }
  __internal_computed(_) {
    throw new Error("__internal_computed called before Clerk is loaded");
  }
  get state() {
    const s = this.isomorphicClerk.__internal_state;
    if (!s) throw new Error("Clerk state not ready");
    return s;
  }
  get client() {
    const c = this.isomorphicClerk.client;
    if (!c) throw new Error("Clerk client not ready");
    return c;
  }
  get checkout() {
    const c = this.isomorphicClerk.__experimental_checkout;
    if (!c) throw new Error("Clerk checkout not ready");
    return c;
  }
  gateProperty(getTarget, key, defaultValue) {
    return (() => {
      if (!inBrowser() || !this.isomorphicClerk.loaded) return defaultValue;
      return getTarget()[key];
    })();
  }
  gateMethod(getTarget, key) {
    return (async (...args) => {
      if (!inBrowser()) return errorThrower.throw(`Attempted to call a method (${key}) that is not supported on the server.`);
      if (!this.isomorphicClerk.loaded) await new Promise((resolve) => this.isomorphicClerk.addOnLoaded(resolve));
      const t = getTarget();
      return t[key].apply(t, args);
    });
  }
  wrapMethods(getTarget, keys) {
    return Object.fromEntries(keys.map((k) => [k, this.gateMethod(getTarget, k)]));
  }
  wrapStruct(getTarget, methods, getters, fallbacks) {
    const out = {};
    for (const m of methods) out[m] = this.gateMethod(getTarget, m);
    for (const g of getters) Object.defineProperty(out, g, {
      get: () => this.gateProperty(getTarget, g, fallbacks[g]),
      enumerable: true
    });
    return out;
  }
};
if (typeof globalThis.__BUILD_DISABLE_RHC__ === "undefined") globalThis.__BUILD_DISABLE_RHC__ = false;
const SDK_METADATA = {
  name: "@clerk/react",
  version: "6.10.2",
  environment: "production"
};
var IsomorphicClerk = class IsomorphicClerk2 {
  #status;
  #domain;
  #proxyUrl;
  #publishableKey;
  #eventBus;
  #stateProxy;
  get publishableKey() {
    return this.#publishableKey;
  }
  get loaded() {
    return this.clerkjs?.loaded || false;
  }
  get status() {
    if (!this.clerkjs) return this.#status;
    return this.clerkjs?.status || (this.clerkjs.loaded ? "ready" : "loading");
  }
  static #instance;
  static getOrCreateInstance(options) {
    if (!inBrowser() || !this.#instance || options.Clerk && this.#instance.Clerk !== options.Clerk || this.#instance.publishableKey !== options.publishableKey) this.#instance = new IsomorphicClerk2(options);
    return this.#instance;
  }
  static clearInstance() {
    this.#instance = null;
  }
  get domain() {
    if (typeof window !== "undefined" && window.location) return handleValueOrFn(this.#domain, new URL(window.location.href), "");
    if (typeof this.#domain === "function") return errorThrower.throw(unsupportedNonBrowserDomainOrProxyUrlFunction);
    return this.#domain || "";
  }
  get proxyUrl() {
    if (typeof window !== "undefined" && window.location) return handleValueOrFn(this.#proxyUrl, new URL(window.location.href), "");
    if (typeof this.#proxyUrl === "function") return errorThrower.throw(unsupportedNonBrowserDomainOrProxyUrlFunction);
    return this.#proxyUrl || "";
  }
  /**
  * Accesses private options from the `Clerk` instance and defaults to
  * `IsomorphicClerk` options when in SSR context.
  *  @internal
  */
  __internal_getOption(key) {
    return this.clerkjs?.__internal_getOption ? this.clerkjs?.__internal_getOption(key) : this.options[key];
  }
  constructor(options) {
    this.clerkjs = null;
    this.preopenOneTap = null;
    this.preopenUserVerification = null;
    this.preopenEnableOrganizationsPrompt = null;
    this.preopenSignIn = null;
    this.preopenCheckout = null;
    this.preopenPlanDetails = null;
    this.preopenSubscriptionDetails = null;
    this.preopenSignUp = null;
    this.preopenUserProfile = null;
    this.preopenOrganizationProfile = null;
    this.preopenCreateOrganization = null;
    this.preOpenWaitlist = null;
    this.premountSignInNodes = /* @__PURE__ */ new Map();
    this.premountSignUpNodes = /* @__PURE__ */ new Map();
    this.premountUserAvatarNodes = /* @__PURE__ */ new Map();
    this.premountUserProfileNodes = /* @__PURE__ */ new Map();
    this.premountUserButtonNodes = /* @__PURE__ */ new Map();
    this.premountOrganizationProfileNodes = /* @__PURE__ */ new Map();
    this.premountCreateOrganizationNodes = /* @__PURE__ */ new Map();
    this.premountOrganizationSwitcherNodes = /* @__PURE__ */ new Map();
    this.premountOrganizationListNodes = /* @__PURE__ */ new Map();
    this.premountMethodCalls = /* @__PURE__ */ new Map();
    this.premountWaitlistNodes = /* @__PURE__ */ new Map();
    this.premountPricingTableNodes = /* @__PURE__ */ new Map();
    this.premountAPIKeysNodes = /* @__PURE__ */ new Map();
    this.premountConfigureSSONodes = /* @__PURE__ */ new Map();
    this.premountOAuthConsentNodes = /* @__PURE__ */ new Map();
    this.premountTaskChooseOrganizationNodes = /* @__PURE__ */ new Map();
    this.premountTaskResetPasswordNodes = /* @__PURE__ */ new Map();
    this.premountTaskSetupMFANodes = /* @__PURE__ */ new Map();
    this.premountAddListenerCalls = /* @__PURE__ */ new Map();
    this.loadedListeners = [];
    this.#status = "loading";
    this.#eventBus = createClerkEventBus();
    this.buildSignInUrl = (opts) => {
      const callback = () => this.clerkjs?.buildSignInUrl(opts) || "";
      if (this.clerkjs && this.loaded) return callback();
      else this.premountMethodCalls.set("buildSignInUrl", callback);
    };
    this.buildSignUpUrl = (opts) => {
      const callback = () => this.clerkjs?.buildSignUpUrl(opts) || "";
      if (this.clerkjs && this.loaded) return callback();
      else this.premountMethodCalls.set("buildSignUpUrl", callback);
    };
    this.buildAfterSignInUrl = (...args) => {
      const callback = () => this.clerkjs?.buildAfterSignInUrl(...args) || "";
      if (this.clerkjs && this.loaded) return callback();
      else this.premountMethodCalls.set("buildAfterSignInUrl", callback);
    };
    this.buildAfterSignUpUrl = (...args) => {
      const callback = () => this.clerkjs?.buildAfterSignUpUrl(...args) || "";
      if (this.clerkjs && this.loaded) return callback();
      else this.premountMethodCalls.set("buildAfterSignUpUrl", callback);
    };
    this.buildAfterSignOutUrl = () => {
      const callback = () => this.clerkjs?.buildAfterSignOutUrl() || "";
      if (this.clerkjs && this.loaded) return callback();
      else this.premountMethodCalls.set("buildAfterSignOutUrl", callback);
    };
    this.buildNewSubscriptionRedirectUrl = () => {
      const callback = () => this.clerkjs?.buildNewSubscriptionRedirectUrl() || "";
      if (this.clerkjs && this.loaded) return callback();
      else this.premountMethodCalls.set("buildNewSubscriptionRedirectUrl", callback);
    };
    this.buildAfterMultiSessionSingleSignOutUrl = () => {
      const callback = () => this.clerkjs?.buildAfterMultiSessionSingleSignOutUrl() || "";
      if (this.clerkjs && this.loaded) return callback();
      else this.premountMethodCalls.set("buildAfterMultiSessionSingleSignOutUrl", callback);
    };
    this.buildUserProfileUrl = () => {
      const callback = () => this.clerkjs?.buildUserProfileUrl() || "";
      if (this.clerkjs && this.loaded) return callback();
      else this.premountMethodCalls.set("buildUserProfileUrl", callback);
    };
    this.buildCreateOrganizationUrl = () => {
      const callback = () => this.clerkjs?.buildCreateOrganizationUrl() || "";
      if (this.clerkjs && this.loaded) return callback();
      else this.premountMethodCalls.set("buildCreateOrganizationUrl", callback);
    };
    this.buildOrganizationProfileUrl = () => {
      const callback = () => this.clerkjs?.buildOrganizationProfileUrl() || "";
      if (this.clerkjs && this.loaded) return callback();
      else this.premountMethodCalls.set("buildOrganizationProfileUrl", callback);
    };
    this.buildWaitlistUrl = () => {
      const callback = () => this.clerkjs?.buildWaitlistUrl() || "";
      if (this.clerkjs && this.loaded) return callback();
      else this.premountMethodCalls.set("buildWaitlistUrl", callback);
    };
    this.buildTasksUrl = () => {
      const callback = () => this.clerkjs?.buildTasksUrl() || "";
      if (this.clerkjs && this.loaded) return callback();
      else this.premountMethodCalls.set("buildTasksUrl", callback);
    };
    this.buildUrlWithAuth = (to) => {
      const callback = () => this.clerkjs?.buildUrlWithAuth(to) || "";
      if (this.clerkjs && this.loaded) return callback();
      else this.premountMethodCalls.set("buildUrlWithAuth", callback);
    };
    this.handleUnauthenticated = async () => {
      const callback = () => this.clerkjs?.handleUnauthenticated();
      if (this.clerkjs && this.loaded) callback();
      else this.premountMethodCalls.set("handleUnauthenticated", callback);
    };
    this.on = (...args) => {
      if (this.clerkjs?.on) return this.clerkjs.on(...args);
      else this.#eventBus.on(...args);
    };
    this.off = (...args) => {
      if (this.clerkjs?.off) return this.clerkjs.off(...args);
      else this.#eventBus.off(...args);
    };
    this.addOnLoaded = (cb) => {
      this.loadedListeners.push(cb);
      if (this.loaded) this.emitLoaded();
    };
    this.emitLoaded = () => {
      this.loadedListeners.forEach((cb) => cb());
      this.loadedListeners = [];
    };
    this.beforeLoad = (clerkjs) => {
      if (!clerkjs) throw new Error("Failed to hydrate latest Clerk JS");
    };
    this.replayInterceptedInvocations = (clerkjs) => {
      if (!clerkjs) throw new Error("Failed to hydrate latest Clerk JS");
      this.clerkjs = clerkjs;
      this.premountMethodCalls.forEach((cb) => cb());
      this.premountAddListenerCalls.forEach((listenerExtras, listener) => {
        listenerExtras.handlers.nativeUnsubscribe = clerkjs.addListener(listener, listenerExtras.options);
      });
      this.#eventBus.internal.retrieveListeners("status")?.forEach((listener) => {
        this.on("status", listener, { notify: true });
      });
      if (this.preopenSignIn !== null) clerkjs.openSignIn(this.preopenSignIn);
      if (this.preopenCheckout !== null) clerkjs.__internal_openCheckout(this.preopenCheckout);
      if (this.preopenPlanDetails !== null) clerkjs.__internal_openPlanDetails(this.preopenPlanDetails);
      if (this.preopenSubscriptionDetails !== null) clerkjs.__internal_openSubscriptionDetails(this.preopenSubscriptionDetails);
      if (this.preopenSignUp !== null) clerkjs.openSignUp(this.preopenSignUp);
      if (this.preopenUserProfile !== null) clerkjs.openUserProfile(this.preopenUserProfile);
      if (this.preopenUserVerification !== null) clerkjs.__internal_openReverification(this.preopenUserVerification);
      if (this.preopenOneTap !== null) clerkjs.openGoogleOneTap(this.preopenOneTap);
      if (this.preopenOrganizationProfile !== null) clerkjs.openOrganizationProfile(this.preopenOrganizationProfile);
      if (this.preopenCreateOrganization !== null) clerkjs.openCreateOrganization(this.preopenCreateOrganization);
      if (this.preOpenWaitlist !== null) clerkjs.openWaitlist(this.preOpenWaitlist);
      if (this.preopenEnableOrganizationsPrompt) clerkjs.__internal_openEnableOrganizationsPrompt(this.preopenEnableOrganizationsPrompt);
      this.premountSignInNodes.forEach((props, node) => {
        clerkjs.mountSignIn(node, props);
      });
      this.premountSignUpNodes.forEach((props, node) => {
        clerkjs.mountSignUp(node, props);
      });
      this.premountUserProfileNodes.forEach((props, node) => {
        clerkjs.mountUserProfile(node, props);
      });
      this.premountUserAvatarNodes.forEach((props, node) => {
        clerkjs.mountUserAvatar(node, props);
      });
      this.premountUserButtonNodes.forEach((props, node) => {
        clerkjs.mountUserButton(node, props);
      });
      this.premountOrganizationListNodes.forEach((props, node) => {
        clerkjs.mountOrganizationList(node, props);
      });
      this.premountWaitlistNodes.forEach((props, node) => {
        clerkjs.mountWaitlist(node, props);
      });
      this.premountPricingTableNodes.forEach((props, node) => {
        clerkjs.mountPricingTable(node, props);
      });
      this.premountAPIKeysNodes.forEach((props, node) => {
        clerkjs.mountAPIKeys(node, props);
      });
      this.premountConfigureSSONodes.forEach((props, node) => {
        clerkjs.__internal_mountConfigureSSO(node, props);
      });
      this.premountOAuthConsentNodes.forEach((props, node) => {
        clerkjs.__internal_mountOAuthConsent(node, props);
      });
      this.premountTaskChooseOrganizationNodes.forEach((props, node) => {
        clerkjs.mountTaskChooseOrganization(node, props);
      });
      this.premountTaskResetPasswordNodes.forEach((props, node) => {
        clerkjs.mountTaskResetPassword(node, props);
      });
      this.premountTaskSetupMFANodes.forEach((props, node) => {
        clerkjs.mountTaskSetupMFA(node, props);
      });
      if (typeof this.clerkjs.status === "undefined") this.#eventBus.emit(clerkEvents.Status, "ready");
      this.emitLoaded();
      return this.clerkjs;
    };
    this.__experimental_checkout = (...args) => {
      return this.loaded && this.clerkjs ? this.clerkjs.__experimental_checkout(...args) : this.#stateProxy.checkoutSignal(...args);
    };
    this.__internal_updateProps = async (props) => {
      const clerkjs = await this.#waitForClerkJS();
      if (clerkjs && "__internal_updateProps" in clerkjs) return clerkjs.__internal_updateProps(props);
    };
    this.setActive = (params) => {
      if (this.clerkjs) return this.clerkjs.setActive(params);
      else return Promise.reject();
    };
    this.openSignIn = (props) => {
      if (this.clerkjs && this.loaded) this.clerkjs.openSignIn(props);
      else this.preopenSignIn = props;
    };
    this.closeSignIn = () => {
      if (this.clerkjs && this.loaded) this.clerkjs.closeSignIn();
      else this.preopenSignIn = null;
    };
    this.__internal_openCheckout = (props) => {
      if (this.clerkjs && this.loaded) this.clerkjs.__internal_openCheckout(props);
      else this.preopenCheckout = props;
    };
    this.__internal_closeCheckout = () => {
      if (this.clerkjs && this.loaded) this.clerkjs.__internal_closeCheckout();
      else this.preopenCheckout = null;
    };
    this.__internal_openPlanDetails = (props) => {
      if (this.clerkjs && this.loaded) this.clerkjs.__internal_openPlanDetails(props);
      else this.preopenPlanDetails = props;
    };
    this.__internal_closePlanDetails = () => {
      if (this.clerkjs && this.loaded) this.clerkjs.__internal_closePlanDetails();
      else this.preopenPlanDetails = null;
    };
    this.__internal_openSubscriptionDetails = (props) => {
      if (this.clerkjs && this.loaded) this.clerkjs.__internal_openSubscriptionDetails(props);
      else this.preopenSubscriptionDetails = props ?? null;
    };
    this.__internal_closeSubscriptionDetails = () => {
      if (this.clerkjs && this.loaded) this.clerkjs.__internal_closeSubscriptionDetails();
      else this.preopenSubscriptionDetails = null;
    };
    this.__internal_openReverification = (props) => {
      if (this.clerkjs && this.loaded) this.clerkjs.__internal_openReverification(props);
      else this.preopenUserVerification = props;
    };
    this.__internal_closeReverification = () => {
      if (this.clerkjs && this.loaded) this.clerkjs.__internal_closeReverification();
      else this.preopenUserVerification = null;
    };
    this.__internal_openEnableOrganizationsPrompt = (props) => {
      if (this.clerkjs && this.loaded) this.clerkjs.__internal_openEnableOrganizationsPrompt(props);
      else this.preopenEnableOrganizationsPrompt = props;
    };
    this.__internal_closeEnableOrganizationsPrompt = () => {
      if (this.clerkjs && this.loaded) this.clerkjs.__internal_closeEnableOrganizationsPrompt();
      else this.preopenEnableOrganizationsPrompt = null;
    };
    this.openGoogleOneTap = (props) => {
      if (this.clerkjs && this.loaded) this.clerkjs.openGoogleOneTap(props);
      else this.preopenOneTap = props;
    };
    this.closeGoogleOneTap = () => {
      if (this.clerkjs && this.loaded) this.clerkjs.closeGoogleOneTap();
      else this.preopenOneTap = null;
    };
    this.openUserProfile = (props) => {
      if (this.clerkjs && this.loaded) this.clerkjs.openUserProfile(props);
      else this.preopenUserProfile = props;
    };
    this.closeUserProfile = () => {
      if (this.clerkjs && this.loaded) this.clerkjs.closeUserProfile();
      else this.preopenUserProfile = null;
    };
    this.openOrganizationProfile = (props) => {
      if (this.clerkjs && this.loaded) this.clerkjs.openOrganizationProfile(props);
      else this.preopenOrganizationProfile = props;
    };
    this.closeOrganizationProfile = () => {
      if (this.clerkjs && this.loaded) this.clerkjs.closeOrganizationProfile();
      else this.preopenOrganizationProfile = null;
    };
    this.openCreateOrganization = (props) => {
      if (this.clerkjs && this.loaded) this.clerkjs.openCreateOrganization(props);
      else this.preopenCreateOrganization = props;
    };
    this.closeCreateOrganization = () => {
      if (this.clerkjs && this.loaded) this.clerkjs.closeCreateOrganization();
      else this.preopenCreateOrganization = null;
    };
    this.openWaitlist = (props) => {
      if (this.clerkjs && this.loaded) this.clerkjs.openWaitlist(props);
      else this.preOpenWaitlist = props;
    };
    this.closeWaitlist = () => {
      if (this.clerkjs && this.loaded) this.clerkjs.closeWaitlist();
      else this.preOpenWaitlist = null;
    };
    this.openSignUp = (props) => {
      if (this.clerkjs && this.loaded) this.clerkjs.openSignUp(props);
      else this.preopenSignUp = props;
    };
    this.closeSignUp = () => {
      if (this.clerkjs && this.loaded) this.clerkjs.closeSignUp();
      else this.preopenSignUp = null;
    };
    this.mountSignIn = (node, props) => {
      if (this.clerkjs && this.loaded) this.clerkjs.mountSignIn(node, props);
      else this.premountSignInNodes.set(node, props);
    };
    this.unmountSignIn = (node) => {
      if (this.clerkjs && this.loaded) this.clerkjs.unmountSignIn(node);
      else this.premountSignInNodes.delete(node);
    };
    this.mountSignUp = (node, props) => {
      if (this.clerkjs && this.loaded) this.clerkjs.mountSignUp(node, props);
      else this.premountSignUpNodes.set(node, props);
    };
    this.unmountSignUp = (node) => {
      if (this.clerkjs && this.loaded) this.clerkjs.unmountSignUp(node);
      else this.premountSignUpNodes.delete(node);
    };
    this.mountUserAvatar = (node, props) => {
      if (this.clerkjs && this.loaded) this.clerkjs.mountUserAvatar(node, props);
      else this.premountUserAvatarNodes.set(node, props);
    };
    this.unmountUserAvatar = (node) => {
      if (this.clerkjs && this.loaded) this.clerkjs.unmountUserAvatar(node);
      else this.premountUserAvatarNodes.delete(node);
    };
    this.mountUserProfile = (node, props) => {
      if (this.clerkjs && this.loaded) this.clerkjs.mountUserProfile(node, props);
      else this.premountUserProfileNodes.set(node, props);
    };
    this.unmountUserProfile = (node) => {
      if (this.clerkjs && this.loaded) this.clerkjs.unmountUserProfile(node);
      else this.premountUserProfileNodes.delete(node);
    };
    this.mountOrganizationProfile = (node, props) => {
      if (this.clerkjs && this.loaded) this.clerkjs.mountOrganizationProfile(node, props);
      else this.premountOrganizationProfileNodes.set(node, props);
    };
    this.unmountOrganizationProfile = (node) => {
      if (this.clerkjs && this.loaded) this.clerkjs.unmountOrganizationProfile(node);
      else this.premountOrganizationProfileNodes.delete(node);
    };
    this.mountCreateOrganization = (node, props) => {
      if (this.clerkjs && this.loaded) this.clerkjs.mountCreateOrganization(node, props);
      else this.premountCreateOrganizationNodes.set(node, props);
    };
    this.unmountCreateOrganization = (node) => {
      if (this.clerkjs && this.loaded) this.clerkjs.unmountCreateOrganization(node);
      else this.premountCreateOrganizationNodes.delete(node);
    };
    this.mountOrganizationSwitcher = (node, props) => {
      if (this.clerkjs && this.loaded) this.clerkjs.mountOrganizationSwitcher(node, props);
      else this.premountOrganizationSwitcherNodes.set(node, props);
    };
    this.unmountOrganizationSwitcher = (node) => {
      if (this.clerkjs && this.loaded) this.clerkjs.unmountOrganizationSwitcher(node);
      else this.premountOrganizationSwitcherNodes.delete(node);
    };
    this.__experimental_prefetchOrganizationSwitcher = () => {
      const callback = () => this.clerkjs?.__experimental_prefetchOrganizationSwitcher();
      if (this.clerkjs && this.loaded) callback();
      else this.premountMethodCalls.set("__experimental_prefetchOrganizationSwitcher", callback);
    };
    this.mountOrganizationList = (node, props) => {
      if (this.clerkjs && this.loaded) this.clerkjs.mountOrganizationList(node, props);
      else this.premountOrganizationListNodes.set(node, props);
    };
    this.unmountOrganizationList = (node) => {
      if (this.clerkjs && this.loaded) this.clerkjs.unmountOrganizationList(node);
      else this.premountOrganizationListNodes.delete(node);
    };
    this.mountUserButton = (node, userButtonProps) => {
      if (this.clerkjs && this.loaded) this.clerkjs.mountUserButton(node, userButtonProps);
      else this.premountUserButtonNodes.set(node, userButtonProps);
    };
    this.unmountUserButton = (node) => {
      if (this.clerkjs && this.loaded) this.clerkjs.unmountUserButton(node);
      else this.premountUserButtonNodes.delete(node);
    };
    this.mountWaitlist = (node, props) => {
      if (this.clerkjs && this.loaded) this.clerkjs.mountWaitlist(node, props);
      else this.premountWaitlistNodes.set(node, props);
    };
    this.unmountWaitlist = (node) => {
      if (this.clerkjs && this.loaded) this.clerkjs.unmountWaitlist(node);
      else this.premountWaitlistNodes.delete(node);
    };
    this.mountPricingTable = (node, props) => {
      if (this.clerkjs && this.loaded) this.clerkjs.mountPricingTable(node, props);
      else this.premountPricingTableNodes.set(node, props);
    };
    this.unmountPricingTable = (node) => {
      if (this.clerkjs && this.loaded) this.clerkjs.unmountPricingTable(node);
      else this.premountPricingTableNodes.delete(node);
    };
    this.mountAPIKeys = (node, props) => {
      if (this.clerkjs && this.loaded) this.clerkjs.mountAPIKeys(node, props);
      else this.premountAPIKeysNodes.set(node, props);
    };
    this.unmountAPIKeys = (node) => {
      if (this.clerkjs && this.loaded) this.clerkjs.unmountAPIKeys(node);
      else this.premountAPIKeysNodes.delete(node);
    };
    this.__internal_mountConfigureSSO = (node, props) => {
      if (this.clerkjs && this.loaded) this.clerkjs.__internal_mountConfigureSSO(node, props);
      else this.premountConfigureSSONodes.set(node, props);
    };
    this.__internal_unmountConfigureSSO = (node) => {
      if (this.clerkjs && this.loaded) this.clerkjs.__internal_unmountConfigureSSO(node);
      else this.premountConfigureSSONodes.delete(node);
    };
    this.__internal_mountOAuthConsent = (node, props) => {
      if (this.clerkjs && this.loaded) this.clerkjs.__internal_mountOAuthConsent(node, props);
      else this.premountOAuthConsentNodes.set(node, props);
    };
    this.__internal_unmountOAuthConsent = (node) => {
      if (this.clerkjs && this.loaded) this.clerkjs.__internal_unmountOAuthConsent(node);
      else this.premountOAuthConsentNodes.delete(node);
    };
    this.mountOAuthConsent = (node, props) => {
      this.__internal_mountOAuthConsent(node, props);
    };
    this.unmountOAuthConsent = (node) => {
      this.__internal_unmountOAuthConsent(node);
    };
    this.mountTaskChooseOrganization = (node, props) => {
      if (this.clerkjs && this.loaded) this.clerkjs.mountTaskChooseOrganization(node, props);
      else this.premountTaskChooseOrganizationNodes.set(node, props);
    };
    this.unmountTaskChooseOrganization = (node) => {
      if (this.clerkjs && this.loaded) this.clerkjs.unmountTaskChooseOrganization(node);
      else this.premountTaskChooseOrganizationNodes.delete(node);
    };
    this.mountTaskResetPassword = (node, props) => {
      if (this.clerkjs && this.loaded) this.clerkjs.mountTaskResetPassword(node, props);
      else this.premountTaskResetPasswordNodes.set(node, props);
    };
    this.unmountTaskResetPassword = (node) => {
      if (this.clerkjs && this.loaded) this.clerkjs.unmountTaskResetPassword(node);
      else this.premountTaskResetPasswordNodes.delete(node);
    };
    this.mountTaskSetupMFA = (node, props) => {
      if (this.clerkjs && this.loaded) this.clerkjs.mountTaskSetupMFA(node, props);
      else this.premountTaskSetupMFANodes.set(node, props);
    };
    this.unmountTaskSetupMFA = (node) => {
      if (this.clerkjs && this.loaded) this.clerkjs.unmountTaskSetupMFA(node);
      else this.premountTaskSetupMFANodes.delete(node);
    };
    this.addListener = (listener, options2) => {
      if (this.clerkjs) return this.clerkjs.addListener(listener, options2);
      else {
        const unsubscribe = () => {
          const listenerExtras = this.premountAddListenerCalls.get(listener);
          if (listenerExtras?.handlers) {
            listenerExtras?.handlers.nativeUnsubscribe?.();
            this.premountAddListenerCalls.delete(listener);
          }
        };
        this.premountAddListenerCalls.set(listener, {
          options: options2,
          handlers: {
            unsubscribe,
            nativeUnsubscribe: void 0
          }
        });
        return unsubscribe;
      }
    };
    this.navigate = (to) => {
      const callback = () => this.clerkjs?.navigate(to);
      if (this.clerkjs && this.loaded) callback();
      else this.premountMethodCalls.set("navigate", callback);
    };
    this.redirectWithAuth = async (...args) => {
      const callback = () => this.clerkjs?.redirectWithAuth(...args);
      if (this.clerkjs && this.loaded) return callback();
      else {
        this.premountMethodCalls.set("redirectWithAuth", callback);
        return;
      }
    };
    this.redirectToSignIn = async (opts) => {
      const callback = () => this.clerkjs?.redirectToSignIn(opts);
      if (this.clerkjs && this.loaded) return callback();
      else {
        this.premountMethodCalls.set("redirectToSignIn", callback);
        return;
      }
    };
    this.redirectToSignUp = async (opts) => {
      const callback = () => this.clerkjs?.redirectToSignUp(opts);
      if (this.clerkjs && this.loaded) return callback();
      else {
        this.premountMethodCalls.set("redirectToSignUp", callback);
        return;
      }
    };
    this.redirectToUserProfile = async () => {
      const callback = () => this.clerkjs?.redirectToUserProfile();
      if (this.clerkjs && this.loaded) return callback();
      else {
        this.premountMethodCalls.set("redirectToUserProfile", callback);
        return;
      }
    };
    this.redirectToAfterSignUp = () => {
      const callback = () => this.clerkjs?.redirectToAfterSignUp();
      if (this.clerkjs && this.loaded) return callback();
      else this.premountMethodCalls.set("redirectToAfterSignUp", callback);
    };
    this.redirectToAfterSignIn = () => {
      const callback = () => this.clerkjs?.redirectToAfterSignIn();
      if (this.clerkjs && this.loaded) callback();
      else this.premountMethodCalls.set("redirectToAfterSignIn", callback);
    };
    this.redirectToAfterSignOut = () => {
      const callback = () => this.clerkjs?.redirectToAfterSignOut();
      if (this.clerkjs && this.loaded) callback();
      else this.premountMethodCalls.set("redirectToAfterSignOut", callback);
    };
    this.redirectToOrganizationProfile = async () => {
      const callback = () => this.clerkjs?.redirectToOrganizationProfile();
      if (this.clerkjs && this.loaded) return callback();
      else {
        this.premountMethodCalls.set("redirectToOrganizationProfile", callback);
        return;
      }
    };
    this.redirectToCreateOrganization = async () => {
      const callback = () => this.clerkjs?.redirectToCreateOrganization();
      if (this.clerkjs && this.loaded) return callback();
      else {
        this.premountMethodCalls.set("redirectToCreateOrganization", callback);
        return;
      }
    };
    this.redirectToWaitlist = async () => {
      const callback = () => this.clerkjs?.redirectToWaitlist();
      if (this.clerkjs && this.loaded) return callback();
      else {
        this.premountMethodCalls.set("redirectToWaitlist", callback);
        return;
      }
    };
    this.redirectToTasks = async (opts) => {
      const callback = () => this.clerkjs?.redirectToTasks(opts);
      if (this.clerkjs && this.loaded) return callback();
      else {
        this.premountMethodCalls.set("redirectToTasks", callback);
        return;
      }
    };
    this.handleRedirectCallback = async (params) => {
      const callback = () => this.clerkjs?.handleRedirectCallback(params);
      if (this.clerkjs && this.loaded) callback()?.catch(() => {
      });
      else this.premountMethodCalls.set("handleRedirectCallback", callback);
    };
    this.handleGoogleOneTapCallback = async (signInOrUp, params) => {
      const callback = () => this.clerkjs?.handleGoogleOneTapCallback(signInOrUp, params);
      if (this.clerkjs && this.loaded) callback()?.catch(() => {
      });
      else this.premountMethodCalls.set("handleGoogleOneTapCallback", callback);
    };
    this.__internal_handleResourceCallback = async (signInOrUp, params, customNavigate) => {
      const callback = () => this.clerkjs?.__internal_handleResourceCallback(signInOrUp, params, customNavigate);
      if (this.clerkjs && this.loaded) return callback();
      this.premountMethodCalls.set("__internal_handleResourceCallback", callback);
    };
    this.handleEmailLinkVerification = async (params) => {
      const callback = () => this.clerkjs?.handleEmailLinkVerification(params);
      if (this.clerkjs && this.loaded) return callback();
      else this.premountMethodCalls.set("handleEmailLinkVerification", callback);
    };
    this.authenticateWithMetamask = async (params) => {
      const callback = () => this.clerkjs?.authenticateWithMetamask(params);
      if (this.clerkjs && this.loaded) return callback();
      else this.premountMethodCalls.set("authenticateWithMetamask", callback);
    };
    this.authenticateWithCoinbaseWallet = async (params) => {
      const callback = () => this.clerkjs?.authenticateWithCoinbaseWallet(params);
      if (this.clerkjs && this.loaded) return callback();
      else this.premountMethodCalls.set("authenticateWithCoinbaseWallet", callback);
    };
    this.authenticateWithBase = async (params) => {
      const callback = () => this.clerkjs?.authenticateWithBase(params);
      if (this.clerkjs && this.loaded) return callback();
      else this.premountMethodCalls.set("authenticateWithBase", callback);
    };
    this.authenticateWithOKXWallet = async (params) => {
      const callback = () => this.clerkjs?.authenticateWithOKXWallet(params);
      if (this.clerkjs && this.loaded) return callback();
      else this.premountMethodCalls.set("authenticateWithOKXWallet", callback);
    };
    this.authenticateWithSolana = async (params) => {
      const callback = () => this.clerkjs?.authenticateWithSolana(params);
      if (this.clerkjs && this.loaded) return callback();
      else this.premountMethodCalls.set("authenticateWithSolana", callback);
    };
    this.authenticateWithWeb3 = async (params) => {
      const callback = () => this.clerkjs?.authenticateWithWeb3(params);
      if (this.clerkjs && this.loaded) return callback();
      else this.premountMethodCalls.set("authenticateWithWeb3", callback);
    };
    this.authenticateWithGoogleOneTap = async (params) => {
      return (await this.#waitForClerkJS()).authenticateWithGoogleOneTap(params);
    };
    this.__internal_loadStripeJs = async () => {
      return (await this.#waitForClerkJS()).__internal_loadStripeJs();
    };
    this.createOrganization = async (params) => {
      const callback = () => this.clerkjs?.createOrganization(params);
      if (this.clerkjs && this.loaded) return callback();
      else this.premountMethodCalls.set("createOrganization", callback);
    };
    this.getOrganization = async (organizationId) => {
      const callback = () => this.clerkjs?.getOrganization(organizationId);
      if (this.clerkjs && this.loaded) return callback();
      else this.premountMethodCalls.set("getOrganization", callback);
    };
    this.joinWaitlist = async (params) => {
      const callback = () => this.clerkjs?.joinWaitlist(params);
      if (this.clerkjs && this.loaded) return callback();
      else this.premountMethodCalls.set("joinWaitlist", callback);
    };
    this.signOut = async (...args) => {
      const callback = () => this.clerkjs?.signOut(...args);
      if (this.clerkjs && this.loaded) return callback();
      else this.premountMethodCalls.set("signOut", callback);
    };
    this.__internal_attemptToEnableEnvironmentSetting = (options2) => {
      const callback = () => this.clerkjs?.__internal_attemptToEnableEnvironmentSetting(options2);
      if (this.clerkjs && this.loaded) return callback();
      else this.premountMethodCalls.set("__internal_attemptToEnableEnvironmentSetting", callback);
    };
    this.#publishableKey = options?.publishableKey;
    this.#proxyUrl = options?.proxyUrl;
    this.#domain = options?.domain;
    this.options = options;
    this.Clerk = options?.Clerk || null;
    this.mode = inBrowser() ? "browser" : "server";
    this.#stateProxy = new StateProxy(this);
    if (!this.options.sdkMetadata) this.options.sdkMetadata = SDK_METADATA;
    this.#eventBus.emit(clerkEvents.Status, "loading");
    this.#eventBus.prioritizedOn(clerkEvents.Status, (status) => this.#status = status);
    if (this.#publishableKey && this.options.experimental?.runtimeEnvironment === "headless" && this.options.Clerk) this.loadHeadlessClerk();
    else if (this.#publishableKey) this.getEntryChunks();
  }
  /**
  * Initialize Clerk for headless/React Native environments where a Clerk instance is provided directly.
  * Only handles Clerk construction and loading — post-load wiring is shared via replayInterceptedInvocations.
  */
  loadHeadlessClerk() {
    const clerk = isConstructor(this.options.Clerk) ? new this.options.Clerk(this.#publishableKey, {
      proxyUrl: this.proxyUrl,
      domain: this.domain
    }) : this.options.Clerk;
    if (!clerk) {
      this.#eventBus.emit(clerkEvents.Status, "error");
      return;
    }
    const onLoaded = () => {
      this.replayInterceptedInvocations(clerk);
    };
    if (!clerk.loaded) clerk.load(this.options).then(() => onLoaded()).catch((err) => {
      this.#eventBus.emit(clerkEvents.Status, "error");
      this.emitLoaded();
    });
    else onLoaded();
  }
  get sdkMetadata() {
    return this.clerkjs?.sdkMetadata || this.options.sdkMetadata || void 0;
  }
  get instanceType() {
    return this.clerkjs?.instanceType;
  }
  get frontendApi() {
    return this.clerkjs?.frontendApi || "";
  }
  get isStandardBrowser() {
    return this.clerkjs?.isStandardBrowser || this.options.standardBrowser || false;
  }
  get isSatellite() {
    if (typeof window !== "undefined" && window.location) return handleValueOrFn(this.options.isSatellite, new URL(window.location.href), false);
    if (typeof this.options.isSatellite === "function") return errorThrower.throw(unsupportedNonBrowserDomainOrProxyUrlFunction);
    return false;
  }
  #waitForClerkJS() {
    return new Promise((resolve) => {
      this.addOnLoaded(() => resolve(this.clerkjs));
    });
  }
  async getEntryChunks() {
    if (this.mode !== "browser" || this.loaded) return;
    if (typeof window !== "undefined") {
      window.__clerk_publishable_key = this.#publishableKey;
      window.__clerk_proxy_url = this.proxyUrl;
      window.__clerk_domain = this.domain;
    }
    try {
      const clerk = await this.getClerkJsEntryChunk();
      if (!clerk.loaded) {
        this.beforeLoad(clerk);
        const ClerkUI = this.options.standardBrowser !== false && !this.options.Clerk || !!this.options.ui?.ClerkUI ? await this.getClerkUIEntryChunk() : void 0;
        await clerk.load({
          ...this.options,
          ui: {
            ...this.options.ui,
            ClerkUI
          }
        });
      }
      if (clerk.loaded) this.replayInterceptedInvocations(clerk);
    } catch (err) {
      const error = err;
      this.#eventBus.emit(clerkEvents.Status, "error");
      console.error(error.stack || error.message || error);
      return;
    }
  }
  async getClerkJsEntryChunk() {
    if ((!this.options.Clerk || this.options.__internal_clerkJSUrl) && !__BUILD_DISABLE_RHC__) await loadClerkJSScript({
      ...this.options,
      publishableKey: this.#publishableKey,
      proxyUrl: this.proxyUrl,
      domain: this.domain,
      nonce: this.options.nonce
    });
    if (this.options.Clerk && !this.options.__internal_clerkJSUrl) globalThis.Clerk = isConstructor(this.options.Clerk) ? new this.options.Clerk(this.#publishableKey, {
      proxyUrl: this.proxyUrl,
      domain: this.domain
    }) : this.options.Clerk;
    if (!globalThis.Clerk) throw new Error("Failed to download latest ClerkJS. Contact support@clerk.com.");
    return globalThis.Clerk;
  }
  async getClerkUIEntryChunk() {
    const uiProp = this.options.ui;
    const hasInternalUrl = !!this.options.__internal_clerkUIUrl;
    if (uiProp?.ClerkUI && !hasInternalUrl) return uiProp.ClerkUI;
    if ((uiProp || this.options.prefetchUI === false) && !hasInternalUrl) return;
    if (!__BUILD_DISABLE_RHC__) {
      await loadClerkUIScript({
        ...this.options,
        publishableKey: this.#publishableKey,
        proxyUrl: this.proxyUrl,
        domain: this.domain,
        nonce: this.options.nonce
      });
      if (!globalThis.__internal_ClerkUICtor) throw new Error("Failed to download latest Clerk UI. Contact support@clerk.com.");
      return globalThis.__internal_ClerkUICtor;
    }
  }
  get version() {
    return this.clerkjs?.version;
  }
  get client() {
    if (this.clerkjs) return this.clerkjs.client;
    else return;
  }
  get session() {
    if (this.clerkjs) return this.clerkjs.session;
    else return;
  }
  get user() {
    if (this.clerkjs) return this.clerkjs.user;
    else return;
  }
  get organization() {
    if (this.clerkjs) return this.clerkjs.organization;
    else return;
  }
  get telemetry() {
    if (this.clerkjs) return this.clerkjs.telemetry;
    else return;
  }
  get __internal_environment() {
    if (this.clerkjs) return this.clerkjs.__internal_environment;
    else return;
  }
  get isSignedIn() {
    if (this.clerkjs) return this.clerkjs.isSignedIn;
    else return false;
  }
  get billing() {
    return this.clerkjs?.billing;
  }
  get __internal_state() {
    return this.loaded && this.clerkjs ? this.clerkjs.__internal_state : this.#stateProxy;
  }
  get apiKeys() {
    return this.clerkjs?.apiKeys;
  }
  get oauthApplication() {
    return this.clerkjs?.oauthApplication;
  }
  __internal_setEnvironment(...args) {
    if (this.clerkjs && "__internal_setEnvironment" in this.clerkjs) this.clerkjs.__internal_setEnvironment(args);
    else return;
  }
  get __internal_lastEmittedResources() {
    return this.clerkjs?.__internal_lastEmittedResources;
  }
  get __internal_hasOAuthTransport() {
    return this.clerkjs?.__internal_hasOAuthTransport || false;
  }
  get __internal_oauthTransport() {
    return this.clerkjs?.__internal_oauthTransport || null;
  }
};
function computeReactVersionCompatibility() {
  try {
    return isVersionCompatible(React.version, [
      [
        18,
        0,
        -1,
        0
      ],
      [
        19,
        0,
        0,
        3
      ],
      [
        19,
        1,
        1,
        4
      ],
      [
        19,
        2,
        2,
        3
      ],
      [
        19,
        3,
        3,
        0
      ]
    ]);
  } catch {
    return false;
  }
}
const IS_REACT_SHARED_VARIANT_COMPATIBLE = computeReactVersionCompatibility();
function ClerkProviderBase(props) {
  const { initialState, children, ...restIsomorphicClerkOptions } = props;
  const { isomorphicClerk, clerkStatus } = useLoadedIsomorphicClerk(mergeWithEnv(restIsomorphicClerkOptions));
  return /* @__PURE__ */ React.createElement(ClerkContextProvider, {
    initialState,
    clerk: isomorphicClerk,
    clerkStatus
  }, children);
}
const ClerkProvider = withMaxAllowedInstancesGuard(ClerkProviderBase, "ClerkProvider", multipleClerkProvidersError);
ClerkProvider.displayName = "ClerkProvider";
const DEFAULT_CLERK_UI_VARIANT = IS_REACT_SHARED_VARIANT_COMPATIBLE ? "shared" : "";
const useLoadedIsomorphicClerk = (mergedOptions) => {
  const optionsWithDefaults = React.useMemo(() => ({
    clerkUIVariant: DEFAULT_CLERK_UI_VARIANT,
    ...mergedOptions
  }), [mergedOptions]);
  const isomorphicClerkRef = React.useRef(IsomorphicClerk.getOrCreateInstance(optionsWithDefaults));
  const [clerkStatus, setClerkStatus] = React.useState(isomorphicClerkRef.current.status);
  React.useEffect(() => {
    isomorphicClerkRef.current.__internal_updateProps({ appearance: mergedOptions.appearance });
  }, [mergedOptions.appearance]);
  React.useEffect(() => {
    isomorphicClerkRef.current.__internal_updateProps({ options: mergedOptions });
  }, [mergedOptions.localization]);
  React.useEffect(() => {
    isomorphicClerkRef.current.on("status", setClerkStatus);
    return () => {
      if (isomorphicClerkRef.current) isomorphicClerkRef.current.off("status", setClerkStatus);
      IsomorphicClerk.clearInstance();
    };
  }, []);
  return {
    isomorphicClerk: isomorphicClerkRef.current,
    clerkStatus
  };
};
function useRoutingProps(componentName, props, routingOptions) {
  const path = props.path || routingOptions?.path;
  if ((props.routing || routingOptions?.routing || "path") === "path") {
    if (!path) return errorThrower.throw(noPathProvidedError(componentName));
    return {
      ...routingOptions,
      ...props,
      routing: "path"
    };
  }
  if (props.path) return errorThrower.throw(incompatibleRoutingWithPathProvidedError(componentName));
  return {
    ...routingOptions,
    ...props,
    path: void 0
  };
}
const InternalClerkProvider = ClerkProvider;
if (typeof window !== "undefined" && !window.global) window.global = typeof global === "undefined" ? window : global;
if (globalThis.__clerkSharedModules) {
  const existingVersion = globalThis.__clerkSharedModules.react?.version;
  if (existingVersion && existingVersion !== reactExports.version) console.warn(`[@clerk/ui/register] React version mismatch detected. Already registered: ${existingVersion}, current import: ${reactExports.version}. This may cause issues with the shared @clerk/ui variant.`);
} else globalThis.__clerkSharedModules = {
  react,
  "react-dom": reactDom,
  "react-dom/client": reactDomClient,
  "react/jsx-runtime": jsxRuntime
};
withClerk(({ clerk, children, ...props }) => {
  const { appearance, getContainer, component, signUpFallbackRedirectUrl, forceRedirectUrl, fallbackRedirectUrl, signUpForceRedirectUrl, mode, initialValues, withSignUp, oauthFlow, ...rest } = props;
  children = normalizeWithDefaultValue(children, "Sign in");
  const child = assertSingleChild(children)("SignInButton");
  const clickHandler = () => {
    const opts = {
      forceRedirectUrl,
      fallbackRedirectUrl,
      signUpFallbackRedirectUrl,
      signUpForceRedirectUrl,
      initialValues,
      withSignUp,
      oauthFlow
    };
    if (mode === "modal") return clerk.openSignIn({
      ...opts,
      appearance,
      getContainer
    });
    return clerk.redirectToSignIn({
      ...opts,
      signInFallbackRedirectUrl: fallbackRedirectUrl,
      signInForceRedirectUrl: forceRedirectUrl
    });
  };
  const wrappedChildClickHandler = async (e) => {
    if (child && typeof child === "object" && "props" in child) await safeExecute(child.props.onClick)(e);
    return clickHandler();
  };
  const childProps = {
    ...rest,
    onClick: wrappedChildClickHandler
  };
  return React.cloneElement(child, childProps);
}, {
  component: "SignInButton",
  renderWhileLoading: true
});
withClerk(({ clerk, children, ...props }) => {
  const { redirectUrl, getContainer, component, ...rest } = props;
  children = normalizeWithDefaultValue(children, "Sign in with Metamask");
  const child = assertSingleChild(children)("SignInWithMetamaskButton");
  const clickHandler = async () => {
    async function authenticate() {
      await clerk.authenticateWithMetamask({ redirectUrl: redirectUrl || void 0 });
    }
    authenticate();
  };
  const wrappedChildClickHandler = async (e) => {
    await safeExecute(child.props.onClick)(e);
    return clickHandler();
  };
  const childProps = {
    ...rest,
    onClick: wrappedChildClickHandler
  };
  return React.cloneElement(child, childProps);
}, {
  component: "SignInWithMetamask",
  renderWhileLoading: true
});
withClerk(({ clerk, children, ...props }) => {
  const { redirectUrl = "/", sessionId, signOutOptions, getContainer, component, ...rest } = props;
  if (signOutOptions) deprecated("SignOutButton `signOutOptions`", "Use the `redirectUrl` and `sessionId` props directly instead.");
  children = normalizeWithDefaultValue(children, "Sign out");
  const child = assertSingleChild(children)("SignOutButton");
  const clickHandler = () => clerk.signOut({
    redirectUrl,
    ...sessionId !== void 0 && { sessionId },
    ...signOutOptions
  });
  const wrappedChildClickHandler = async (e) => {
    await safeExecute(child.props.onClick)(e);
    return clickHandler();
  };
  const childProps = {
    ...rest,
    onClick: wrappedChildClickHandler
  };
  return React.cloneElement(child, childProps);
}, {
  component: "SignOutButton",
  renderWhileLoading: true
});
withClerk(({ clerk, children, ...props }) => {
  const { appearance, unsafeMetadata, getContainer, component, fallbackRedirectUrl, forceRedirectUrl, signInFallbackRedirectUrl, signInForceRedirectUrl, mode, initialValues, oauthFlow, ...rest } = props;
  children = normalizeWithDefaultValue(children, "Sign up");
  const child = assertSingleChild(children)("SignUpButton");
  const clickHandler = () => {
    const opts = {
      fallbackRedirectUrl,
      forceRedirectUrl,
      signInFallbackRedirectUrl,
      signInForceRedirectUrl,
      initialValues,
      oauthFlow
    };
    if (mode === "modal") return clerk.openSignUp({
      ...opts,
      appearance,
      unsafeMetadata,
      getContainer
    });
    return clerk.redirectToSignUp({
      ...opts,
      signUpFallbackRedirectUrl: fallbackRedirectUrl,
      signUpForceRedirectUrl: forceRedirectUrl
    });
  };
  const wrappedChildClickHandler = async (e) => {
    if (child && typeof child === "object" && "props" in child) await safeExecute(child.props.onClick)(e);
    return clickHandler();
  };
  const childProps = {
    ...rest,
    onClick: wrappedChildClickHandler
  };
  return React.cloneElement(child, childProps);
}, {
  component: "SignUpButton",
  renderWhileLoading: true
});
setErrorThrowerOptions({ packageName: "@clerk/react" });
setClerkJSLoadingErrorPackageName("@clerk/react");
export {
  InternalClerkProvider as I,
  OrganizationProfile as O,
  SignUp as S,
  UserButton as U,
  useRoutingProps as a,
  SignIn as b,
  UserProfile as c,
  OrganizationList as d,
  setErrorThrowerOptions as s,
  useAuth as u
};
