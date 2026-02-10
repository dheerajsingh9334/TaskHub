import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";

const statusBadge = {
  pending: "badge-pending",
  "in-progress": "badge-in-progress",
  completed: "badge-completed",
};

const priorityClass = {
  low: "priority-low",
  medium: "priority-medium",
  high: "priority-high",
};

const priorityIcon = {
  low: "▽",
  medium: "◆",
  high: "▲",
};

const TaskCard = ({ task, onEdit, onDelete }) => {
  const formattedDate = new Date(task.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="card hover:border-gray-300 transition-colors">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3
            className={`font-medium text-gray-800 truncate ${
              task.status === "completed" ? "line-through text-gray-400" : ""
            }`}
          >
            {task.title}
          </h3>

          {task.description && (
            <p className="text-gray-500 text-sm mt-1 line-clamp-2">
              {task.description}
            </p>
          )}

          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span className={statusBadge[task.status]}>
              {task.status === "in-progress"
                ? "In Progress"
                : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
            </span>
            <span
              className={`text-xs font-medium flex items-center gap-1 ${priorityClass[task.priority]}`}
            >
              {priorityIcon[task.priority]} {task.priority}
            </span>
            <span className="text-gray-400 text-xs">{formattedDate}</span>
          </div>
        </div>

        <div className="flex gap-1">
          <button
            onClick={() => onEdit(task)}
            className="p-1.5 rounded text-gray-400 hover:text-brand-gold hover:bg-cream-100"
            title="Edit task"
          >
            <HiOutlinePencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="p-1.5 rounded text-gray-400 hover:text-red-500 hover:bg-red-50"
            title="Delete task"
          >
            <HiOutlineTrash className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
