import bcrypt from "bcryptjs";
import APIError from "../../utils/APIError.js";
import { APIResponse } from "../../utils/APIResponse.js";
import User from "../user/user.model.js";
import { cookieOptions } from "./auth.cookies.js";
import {
  accessTokenMaxAge,
  refreshTokenMaxAge,
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "./auth.tokens.js";

const publicUser = (user) => ({
  _id: user._id,
  email: user.email,
  role: user.role,
});

const setAuthCookies = (res, user) => {
  res.cookie("accessToken", signAccessToken(user), cookieOptions(accessTokenMaxAge()));
  res.cookie("refreshToken", signRefreshToken(user), cookieOptions(refreshTokenMaxAge()));
};

const clearAuthCookies = (res) => {
  res.clearCookie("accessToken", cookieOptions(0));
  res.clearCookie("refreshToken", cookieOptions(0));
};

export const login = async (req, res) => {
  const email = String(req.body?.email || "").trim().toLowerCase();
  const password = String(req.body?.password || "");

  if (!email || !password) {
    throw new APIError(400, "Email and password are required");
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new APIError(401, "Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new APIError(401, "Invalid email or password");
  }

  setAuthCookies(res, user);
  return res.status(200).json(new APIResponse(200, "Logged in", publicUser(user)));
};

export const logout = async (req, res) => {
  clearAuthCookies(res);
  return res.status(200).json(new APIResponse(200, "Logged out", null));
};

export const refresh = async (req, res) => {
  const token = req.cookies?.refreshToken;
  if (!token) {
    throw new APIError(401, "Refresh token missing");
  }

  let payload;
  try {
    payload = verifyRefreshToken(token);
  } catch {
    throw new APIError(401, "Invalid or expired refresh token");
  }

  const user = await User.findById(payload._id);
  if (!user) {
    throw new APIError(401, "User not found");
  }

  setAuthCookies(res, user);
  return res.status(200).json(new APIResponse(200, "Session refreshed", publicUser(user)));
};

export const me = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new APIError(401, "User not found");
  }

  return res.status(200).json(new APIResponse(200, "Current user", publicUser(user)));
};
