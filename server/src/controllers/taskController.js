import taskService from "../services/taskService.js";
import logger from "../utils/logger.js";

const createTask = async (req, res, next) => {
  try {
    const task = await taskService.create(req.user._id, req.body);

    res.status(201).json({ success: true, data: task });
    logger.info("Task created", { taskId: task._id, userId: req.user._id });
  } catch (error) {
    next(error);
  }
};

const getTasks = async (req, res, next) => {
  try {
    const { status, priority, page, limit } = req.query;
    const result = await taskService.getAll(req.user._id, {
      status,
      priority,
      page,
      limit,
    });
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const getTaskStats = async (req, res, next) => {
  try {
    const stats = await taskService.getStats(req.user._id);
    res.status(200).json({ success: true, data: stats });
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const task = await taskService.update(
      req.params.id,
      req.user._id,
      req.body,
    );
    logger.info("Task updated", { taskId: req.params.id });
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    await taskService.delete(req.params.id, req.user._id);
    logger.info("Task deleted", { taskId: req.params.id });
    res
      .status(200)
      .json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const searchTasks = async (req, res, next) => {
  try {
    const { query } = req.query;
    const tasks = await taskService.search(req.user._id, query);
    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    next(error);
  }
};

export {
  createTask,
  getTasks,
  getTaskStats,
  updateTask,
  deleteTask,
  searchTasks,
};
