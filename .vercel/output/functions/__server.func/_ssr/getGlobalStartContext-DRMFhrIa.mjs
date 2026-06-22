import { d as getStartContext } from "./server-rHDi7l_h.mjs";
var getGlobalStartContext = () => {
  const context = getStartContext().contextAfterGlobalMiddlewares;
  if (!context) throw new Error(`Global context not set yet, you are calling getGlobalStartContext() before the global middlewares are applied.`);
  return context;
};
export {
  getGlobalStartContext as g
};
