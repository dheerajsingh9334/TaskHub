import Task from "../models/Task.js";
import AppError from "../utils/AppError.js";

class TaskService {
  async create(userId, taskData) {
    const task = await Task.create({ ...taskData, user: userId });
    return task;
  }

  async getAll(userId, { status, priority, page = 1, limit = 10 }) {
    const filter = { user: userId };
    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    const skip = (page - 1) * limit;

    const [tasks, total] = await Promise.all([
      Task.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Task.countDocuments(filter),
    ]);

    return {
      tasks,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit),
      },
    };
  }

  async update(taskId, userId, updates) {
    const task = await Task.findOneAndUpdate(
      { _id: taskId, user: userId },
      updates,
      { new: true, runValidators: true },
    );
    if (!task) {
      throw new AppError("Task not found", 404);
    }
    return task;
  }

  async delete(taskId, userId) {
    const task = await Task.findOneAndDelete({ _id: taskId, user: userId });
    if (!task) {
      throw new AppError("Task not found", 404);
    }
    return task;
  }

  async search(userId, query) {
    if (!query || query.trim() === "") {
      throw new AppError("Search query is required", 400);
    }

    const tasks = await Task.find({
      user: userId,
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    }).sort({ createdAt: -1 });

    return tasks;
  }

  async getStats(userId) {
    const [total, pending, inProgress, completed] = await Promise.all([
      Task.countDocuments({ user: userId }),
      Task.countDocuments({ user: userId, status: "pending" }),
      Task.countDocuments({ user: userId, status: "in-progress" }),
      Task.countDocuments({ user: userId, status: "completed" }),
    ]);

    return { total, pending, inProgress, completed };
  }
}

export default new TaskService();
