import { maintenanceModeMiddleware } from "./middlewares/maintenanceModeMiddleware";
import { stackMiddlewares } from "@/middlewares/stackMiddlewares";

export const middleware = stackMiddlewares([maintenanceModeMiddleware]);
