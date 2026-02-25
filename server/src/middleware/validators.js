import { body, param, query } from "express-validator";
import { validationResult } from "express-validator";
import AppError from "../utils/AppError.js";

/**
 * Middleware to check validation results and return structured errors.
 */
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors.array().map((e) => e.msg);
    return next(new AppError(messages.join(", "), 400));
  }
  next();
};

/**
 * Auth Validators
 */
export const registerValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 50 })
    .withMessage("Name cannot exceed 50 characters")
    .escape(),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  validate,
];

export const loginValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),
  validate,
];

export const updateProfileValidator = [
  body("name")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Name cannot exceed 50 characters")
    .escape(),
  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),
  validate,
];

/**
 * Task Validators
 */
export const createTaskValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Task title is required")
    .isLength({ max: 100 })
    .withMessage("Title cannot exceed 100 characters")
    .escape(),
  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters")
    .escape(),
  body("status")
    .optional()
    .isIn(["pending", "in-progress", "completed"])
    .withMessage("Status must be pending, in-progress, or completed"),
  body("priority")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage("Priority must be low, medium, or high"),
  validate,
];

export const updateTaskValidator = [
  param("id").isMongoId().withMessage("Invalid task ID"),
  body("title")
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Title must be between 1 and 100 characters")
    .escape(),
  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters")
    .escape(),
  body("status")
    .optional()
    .isIn(["pending", "in-progress", "completed"])
    .withMessage("Status must be pending, in-progress, or completed"),
  body("priority")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage("Priority must be low, medium, or high"),
  validate,
];

export const deleteTaskValidator = [
  param("id").isMongoId().withMessage("Invalid task ID"),
  validate,
];

export const searchTaskValidator = [
  query("query")
    .trim()
    .notEmpty()
    .withMessage("Search query is required")
    .isLength({ max: 100 })
    .withMessage("Search query cannot exceed 100 characters")
    .escape(),
  validate,
];
