import healthRoutes from "../modules/health/health.route.js";
import authRoutes from "../modules/auth/auth.route.js";
import mediaRoutes from "../modules/media/media.route.js";

const appRoutes = [
  {
    path: "/api/v1",
    route: healthRoutes,
  },
  {
    path: "/api/v1/auth",
    route: authRoutes,
  },
  {
    path: "/api/v1/media",
    route: mediaRoutes,
  },
];

export default appRoutes;
