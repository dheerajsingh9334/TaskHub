import { Router } from "express";
import {
  register,
  login,
  getProfile,
  updateProfile,
  logout,
} from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";
import {
  registerValidator,
  loginValidator,
  updateProfileValidator,
} from "../middleware/validators.js";

const router = Router();

router.post("/register", registerValidator, register);
router.post("/login", loginValidator, login);
router.post("/logout", logout);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfileValidator, updateProfile);

export default router;
