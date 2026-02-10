import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  HiOutlineLogout,
  HiOutlineUser,
  HiOutlineViewGrid,
} from "react-icons/hi";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-gold rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-sm">TH</span>
            </div>
            <span className="text-lg font-semibold text-gray-800">
              Task<span className="text-brand-gold">HUb</span>
            </span>
          </Link>

          {user ? (
            <div className="flex items-center gap-1">
              <Link
                to="/dashboard"
                className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium ${
                  isActive("/dashboard")
                    ? "bg-cream-100 text-brand-gold-dark"
                    : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                <HiOutlineViewGrid className="w-4 h-4" />
                Dashboard
              </Link>
              <Link
                to="/profile"
                className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium ${
                  isActive("/profile")
                    ? "bg-cream-100 text-brand-gold-dark"
                    : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                <HiOutlineUser className="w-4 h-4" />
                Profile
              </Link>
              <div className="w-px h-5 bg-gray-200 mx-2" />
              <span className="text-sm text-gray-500 hidden sm:block">
                {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium text-red-500 hover:bg-red-50"
              >
                <HiOutlineLogout className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="btn-outline text-sm py-1.5 px-4">
                Login
              </Link>
              <Link to="/register" className="btn-primary text-sm py-1.5 px-4">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
