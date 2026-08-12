import { useEffect, useState } from "react";
import api from "../../services/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSwaps: 0,
    pendingRequests: 0,
    completedSwaps: 0,
  });

  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await api.get("/admin/stats");

      setStats(res.data.stats);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="h-14 w-14 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">

      <h1 className="text-4xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-slate-800 rounded-xl p-6">
          <h2 className="text-gray-400">Total Users</h2>

          <p className="text-4xl font-bold text-cyan-400 mt-2">
            {stats.totalUsers}
          </p>
        </div>

        <div className="bg-slate-800 rounded-xl p-6">
          <h2 className="text-gray-400">Total Swaps</h2>

          <p className="text-4xl font-bold text-green-400 mt-2">
            {stats.totalSwaps}
          </p>
        </div>

        <div className="bg-slate-800 rounded-xl p-6">
          <h2 className="text-gray-400">
            Pending Requests
          </h2>

          <p className="text-4xl font-bold text-yellow-400 mt-2">
            {stats.pendingRequests}
          </p>
        </div>

        <div className="bg-slate-800 rounded-xl p-6">
          <h2 className="text-gray-400">
            Completed Swaps
          </h2>

          <p className="text-4xl font-bold text-purple-400 mt-2">
            {stats.completedSwaps}
          </p>
        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;