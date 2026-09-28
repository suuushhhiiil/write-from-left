import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "../middleware/errorHandler.js";
import appRoutes from "./routes.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);

app.use(express.json({ limit: "1kb" }));
app.use(express.urlencoded({ extended: true, limit: "1kb" }));
app.use(express.static("public"));
app.use(cookieParser());

appRoutes.forEach((route) => {
  app.use(route.path, route.route);
});

app.use(errorHandler);
export default app;
