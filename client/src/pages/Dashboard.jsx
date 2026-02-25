import { useState, useEffect, useCallback } from "react";
import { taskAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useDebounce } from "../hooks/useDebounce";
import TaskCard from "../features/tasks/TaskCard";
import TaskModal from "../features/tasks/TaskModal";
import LoadingSkeleton from "../components/LoadingSkeleton";
import toast from "react-hot-toast";
import {
  HiOutlinePlus,
  HiOutlineSearch,
  HiOutlineFilter,
  HiOutlineClipboardList,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi";

const TASKS_PER_PAGE = 6;

const Dashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, page: 1, pages: 1 });
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
  });

  const debouncedSearch = useDebounce(searchQuery, 400);

  const fetchStats = useCallback(async () => {
    try {
      const res = await taskAPI.getStats();
      setStats(res.data.data);
    } catch (error) {
      // Stats will stay at defaults
    }
  }, []);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      if (debouncedSearch) {
        const res = await taskAPI.search(debouncedSearch);
        setTasks(res.data.data);
        setPagination({ total: res.data.data.length, page: 1, pages: 1 });
      } else {
        const params = { limit: TASKS_PER_PAGE, page };
        if (statusFilter) params.status = statusFilter;
        if (priorityFilter) params.priority = priorityFilter;
        const res = await taskAPI.getAll(params);
        setTasks(res.data.data.tasks);
        setPagination(res.data.data.pagination);
      }
    } catch (error) {
      toast.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, statusFilter, priorityFilter, page]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, statusFilter, priorityFilter]);

  const handleSave = async (data, taskId) => {
    if (taskId) {
      await taskAPI.update(taskId, data);
    } else {
      await taskAPI.create(data);
    }
    fetchTasks();
    fetchStats();
  };

  const handleDelete = async (taskId) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      await taskAPI.delete(taskId);
      toast.success("Task deleted");
      fetchTasks();
      fetchStats();
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTask(null);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800">
            Welcome back, <span className="text-brand-gold">{user?.name}</span>
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">
            Manage your tasks and stay productive
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="btn-primary flex items-center gap-2 w-fit"
        >
          <HiOutlinePlus className="w-4 h-4" />
          New Task
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <div className="card text-center py-4">
          <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
          <p className="text-gray-500 text-xs mt-1">Total Tasks</p>
        </div>
        <div className="card text-center py-4 border-yellow-200">
          <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
          <p className="text-gray-500 text-xs mt-1">Pending</p>
        </div>
        <div className="card text-center py-4 border-blue-200">
          <p className="text-2xl font-bold text-blue-500">{stats.inProgress}</p>
          <p className="text-gray-500 text-xs mt-1">In Progress</p>
        </div>
        <div className="card text-center py-4 border-green-200">
          <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
          <p className="text-gray-500 text-xs mt-1">Completed</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-9"
            placeholder="Search tasks..."
          />
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <HiOutlineFilter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input-field pl-8 pr-6 appearance-none min-w-[130px]"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="input-field appearance-none min-w-[120px]"
          >
            <option value="">All Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      {loading ? (
        <LoadingSkeleton count={4} />
      ) : tasks.length === 0 ? (
        <div className="card text-center py-12">
          <HiOutlineClipboardList className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-base font-medium text-gray-600">
            {searchQuery ? "No tasks found" : "No tasks yet"}
          </h3>
          <p className="text-gray-400 text-sm mt-1">
            {searchQuery
              ? "Try a different search query"
              : "Create your first task to get started"}
          </p>
          {!searchQuery && (
            <button
              onClick={() => setShowModal(true)}
              className="btn-primary mt-3 inline-flex items-center gap-2 text-sm"
            >
              <HiOutlinePlus className="w-4 h-4" />
              Create Task
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {!loading && !debouncedSearch && pagination.pages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <HiOutlineChevronLeft className="w-4 h-4" />
            Prev
          </button>
          <span className="text-sm text-gray-600">
            Page {pagination.page} of {pagination.pages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(pagination.pages, p + 1))}
            disabled={page >= pagination.pages}
            className="flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Next
            <HiOutlineChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {showModal && (
        <TaskModal
          task={editingTask}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Dashboard;
