import authService from "../services/authService.js";
import logger from "../utils/logger.js";
import { encryptFields } from "../utils/encryption.js";
import env from "../config/env.js";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: env.isProd,
  sameSite: env.isProd ? "strict" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  path: "/",
};

const register = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);

    // Encrypt sensitive fields in response
    const encryptedUser = encryptFields(result.user, ["email"]);

    res.cookie("token", result.token, COOKIE_OPTIONS);
    res.status(201).json({
      success: true,
      data: { user: encryptedUser, token: result.token },
    });
    logger.info("User registered", { userId: result.user.id });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);

    // Encrypt sensitive fields in response
    const encryptedUser = encryptFields(result.user, ["email"]);

    res.cookie("token", result.token, COOKIE_OPTIONS);
    res.status(200).json({
      success: true,
      data: { user: encryptedUser, token: result.token },
    });
    logger.info("User logged in", { userId: result.user.id });
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const profile = await authService.getProfile(req.user._id);
    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    if (!name && !email) {
      return res
        .status(400)
        .json({ success: false, message: "Provide name or email to update" });
    }

    const profile = await authService.updateProfile(req.user._id, req.body);

    res.status(200).json({ success: true, data: profile });
    logger.info("Profile updated", { userId: req.user._id });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      secure: env.isProd,
      sameSite: env.isProd ? "strict" : "lax",
      expires: new Date(0),
      path: "/",
    });

    res.status(200).json({ success: true, message: "Logged out successfully" });
    logger.info("User logged out");
  } catch (error) {
    next(error);
  }
};

export { register, login, getProfile, updateProfile, logout };
