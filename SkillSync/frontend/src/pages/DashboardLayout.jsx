import { Outlet, Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const DashboardLayout = () => {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-8 text-blue-600">SkillSync</h2>
          <nav className="flex flex-col gap-4">
            <Link to="/dashboard" className="hover:text-blue-500">
              Overview
            </Link>
            <Link to="/dashboard/career-paths" className="hover:text-blue-500">
              Career Paths
            </Link>
            <Link to="/dashboard/ai-advisor" className="hover:text-blue-500">
              AI Advisor
            </Link>
            <Link to="/dashboard/settings" className="hover:text-blue-500">
              Settings
            </Link>
          </nav>
        </div>

        {/* Bottom section with user + logout */}
        <div className="border-t pt-4">
          {user && (
            <p className="text-sm text-gray-500 mb-2">
              Logged in as <br /> {user.email}
            </p>
          )}
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
