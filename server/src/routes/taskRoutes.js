import { Router } from "express";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  searchTasks,
} from "../controllers/taskController.js";
import { protect } from "../middleware/auth.js";

const router = Router();

router.get("/search", protect, searchTasks);
router.post("/", protect, createTask);
router.get("/", protect, getTasks);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);

export default router;
