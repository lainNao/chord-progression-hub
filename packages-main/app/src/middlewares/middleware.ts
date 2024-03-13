import { maintenanceModeMiddleware } from "./maintenanceModeMiddleware";
import { stackMiddlewares } from "@/middlewares/stackMiddlewares";

export const middleware = stackMiddlewares([maintenanceModeMiddleware]);
