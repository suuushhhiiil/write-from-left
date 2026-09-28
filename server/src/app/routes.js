import healthRoutes from "../modules/health/health.route.js";

const appRoutes = [
  {
    path: "/api/v1",
    route: healthRoutes,
  },
];

export default appRoutes;
