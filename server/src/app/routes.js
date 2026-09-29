import healthRoutes from "../modules/health/health.route.js";
import authRoutes from "../modules/auth/auth.route.js";
import mediaRoutes from "../modules/media/media.route.js";
import blogRoutes from "../modules/blog/blog.route.js";
import contactRoutes from "../modules/contact/contact.route.js";

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
  {
    path: "/api/v1/blogs",
    route: blogRoutes,
  },
  {
    path: "/api/v1/contact",
    route: contactRoutes,
  },
];

export default appRoutes;
