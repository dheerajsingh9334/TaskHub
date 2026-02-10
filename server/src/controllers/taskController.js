import taskService from "../services/taskService.js";

const createTask = async (req, res, next) => {
  try {
    const { title } = req.body;

    if (!title || !title.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "Task title is required" });
    }

    const task = await taskService.create(req.user._id, req.body);

    res.status(201).json({ success: true, data: task });
    console.log("Task created:", {
      success: true,
      data: task,
    });
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
    console.log({ success: true, data: result.tasks });
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { title } = req.body;

    if (!title || !title.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "Task title is required" });
    }

    const task = await taskService.update(
      req.params.id,
      req.user._id,
      req.body,
    );
    console.log({ success: true, data: task });
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    await taskService.delete(req.params.id, req.user._id);
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
    console.log({ success: true, data: tasks });
  } catch (error) {
    next(error);
  }
};

export { createTask, getTasks, updateTask, deleteTask, searchTasks };
