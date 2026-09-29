import jwt from "jsonwebtoken";
import { parseDurationToMs } from "./auth.cookies.js";

export const signAccessToken = (user) =>
  jwt.sign(
    { _id: user._id, email: user.email, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "15m" },
  );

export const signRefreshToken = (user) =>
  jwt.sign(
    { _id: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "7d" },
  );

export const verifyAccessToken = (token) =>
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

export const verifyRefreshToken = (token) =>
  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

export const accessTokenMaxAge = () =>
  parseDurationToMs(process.env.ACCESS_TOKEN_EXPIRY, 15 * 60 * 1000);

export const refreshTokenMaxAge = () =>
  parseDurationToMs(process.env.REFRESH_TOKEN_EXPIRY, 7 * 24 * 60 * 60 * 1000);
