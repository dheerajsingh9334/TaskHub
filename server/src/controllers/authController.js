import authService from "../services/authService.js";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const result = await authService.register(req.body);

    res.cookie("token", result.token, COOKIE_OPTIONS);
    res.status(201).json({ success: true, data: result });
    console.log({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    const result = await authService.login(req.body);

    res.cookie("token", result.token, COOKIE_OPTIONS);
    res.status(200).json({ success: true, data: result });
    console.log({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const profile = await authService.getProfile(req.user._id);
    console.log({ success: true, profile });
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
    console.log({ success: true, data: profile });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  console.log("Logout route hit");
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    res.status(200).json({ success: true, message: "Logged out successfully" });
    console.log({ success: true, message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};

export { register, login, getProfile, updateProfile, logout };
