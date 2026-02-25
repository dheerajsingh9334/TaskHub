import { Router } from "express";
import {
  createTask,
  getTasks,
  getTaskStats,
  updateTask,
  deleteTask,
  searchTasks,
} from "../controllers/taskController.js";
import { protect } from "../middleware/auth.js";
import {
  createTaskValidator,
  updateTaskValidator,
  deleteTaskValidator,
  searchTaskValidator,
} from "../middleware/validators.js";

const router = Router();

router.get("/search", protect, searchTaskValidator, searchTasks);
router.get("/stats", protect, getTaskStats);
router.post("/", protect, createTaskValidator, createTask);
router.get("/", protect, getTasks);
router.put("/:id", protect, updateTaskValidator, updateTask);
router.delete("/:id", protect, deleteTaskValidator, deleteTask);

export default router;
