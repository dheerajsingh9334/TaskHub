import User from "../models/User.js";
import { generateToken } from "../utils/jwt.js";
import AppError from "../utils/AppError.js";

class AuthService {
  async register({ name, email, password }) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new AppError("Email already registered", 400);
    }

    const user = await User.create({ name, email, password });
    const token = generateToken(user._id);

    return {
      user: { id: user._id, name: user.name, email: user.email },
      token,
    };
  }

  async login({ email, password }) {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new AppError("Invalid email or password", 401);
    }

    const token = generateToken(user._id);

    return {
      user: { id: user._id, name: user.name, email: user.email },
      token,
    };
  }

  async getProfile(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };
  }

  async updateProfile(userId, updates) {
    const user = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return { id: user._id, name: user.name, email: user.email };
  }
}

export default new AuthService();
