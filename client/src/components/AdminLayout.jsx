import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminLayout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800 p-6 flex flex-col">
        <div>
          <h1 className="text-3xl font-bold text-cyan-400 mb-10">
            SkillSwap
          </h1>

          <nav className="space-y-3">
            <Link
              to="/admin"
              className="block p-3 rounded-lg hover:bg-slate-700"
            >
              📊 Dashboard
            </Link>

            <Link
              to="/admin/users"
              className="block p-3 rounded-lg hover:bg-slate-700"
            >
              👥 Users
            </Link>

            <Link
              to="/admin/swaps"
              className="block p-3 rounded-lg hover:bg-slate-700"
            >
              🔄 Swap Requests
            </Link>
          </nav>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-auto w-full bg-red-500 hover:bg-red-600 py-3 rounded-lg font-semibold transition"
        >
          🚪 Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;