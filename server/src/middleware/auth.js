import jwt from "jsonwebtoken";
import APIError from "../utils/APIError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { verifyAccessToken } from "../modules/auth/auth.tokens.js";

export const requireAuth = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.accessToken;

  if (!token) {
    throw new APIError(401, "Authentication required");
  }

  try {
    req.user = verifyAccessToken(token);
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError) {
      throw new APIError(401, "Invalid or expired session");
    }
    throw error;
  }
});

export const requireAdmin = asyncHandler(async (req, res, next) => {
  if (req.user?.role !== "admin") {
    throw new APIError(403, "Admin access required");
  }
  next();
});
