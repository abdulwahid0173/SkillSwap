import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import api from "../services/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    pendingRequests: 0,
    acceptedRequests: 0,
  });
  const [pendingRequests, setPendingRequests] = useState([]);
  const [acceptedSwaps, setAcceptedSwaps] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardStats = async () => {
    if (!user) return;
    try {
      const usersRes = await api.get("/users");
      const requestsRes = await api.get("/swaps");

      const currentUserId = user._id;
      const pending = requestsRes.data.swapRequests.filter(
        (request) =>
          request.status === "pending" &&
          (
            request.sender._id === currentUserId ||
            request.receiver._id === currentUserId
          )
      );

      const accepted = requestsRes.data.swapRequests.filter(
        (request) =>
          request.status === "accepted" &&
          (
            request.sender._id === currentUserId ||
            request.receiver._id === currentUserId
          )
      );

      setPendingRequests(pending);
      setAcceptedSwaps(accepted);

      setStats({
        totalUsers: usersRes.data.users.length,
        pendingRequests: pending.length,
        acceptedRequests: accepted.length,
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to load dashboard stats");
    }
  };

  const [recentRequests, setRecentRequests] = useState([]);

  const fetchRecentRequests = async () => {
    try {
      const res = await api.get("/swaps");
      const myRequests = res.data.swapRequests.filter(
        (request) =>
          request.sender?._id === user._id ||
          request.receiver?._id === user._id
      );
      setRecentRequests(myRequests.slice(0, 5));
    } catch (error) {
      console.error(error);
      toast.error("Failed to load recent requests");
    }
  };

  useEffect(() => {
    if (!user) return;

    const loadDashboard = async () => {
      try {
        setLoading(true);

        await Promise.all([
          fetchDashboardStats(),
          fetchRecentRequests(),
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [user]);

  const calculateProfileCompletion = () => {
    if (!user) return 0;

    const fields = [
      user.profileImage,
      user.bio,
      user.location,
      user.college,
      user.github,
      user.linkedin,
      user.portfolio,
      user.skillsOffered?.length > 0,
      user.skillsWanted?.length > 0,
    ];

    const completed = fields.filter(Boolean).length;

    return Math.round((completed / fields.length) * 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="h-14 w-14 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />

      <div className="max-w-6xl mx-auto mt-10 px-6">

        <div className="flex items-center gap-6">

          <img
            src={
              user?.profileImage ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                user?.fullName || "User"
              )}`
            }
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-cyan-500"
          />

          <div>
            <h2 className="text-4xl font-bold">
              Welcome,
              <span className="text-cyan-400">
                {" "}
                {user?.fullName}
              </span>
            </h2>
          </div>

        </div>

        <div className="mt-8 bg-slate-800 rounded-xl p-6">

          <h3 className="text-2xl font-semibold mb-4">
            Profile Information
          </h3>

          <p>
            <strong>Name:</strong> {user?.fullName}
          </p>

          <p>
            <strong>Username:</strong> {user?.username}
          </p>

          <p>
            <strong>Email:</strong> {user?.email}
          </p>

          <p>
            <strong>Rating:</strong>{" "}
            ⭐ {user?.rating > 0? user.rating.toFixed(1) : "No Ratings Yet"}
          </p>

          <p>
            <strong>Completed Swaps:</strong> {user?.completedSwaps || 0}
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-cyan-500 transition">
            <p className="text-gray-400 text-sm">Skills Offered</p>
            <h2>{user.skillsOffered?.length || 0}</h2>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-yellow-500 transition">
            <p className="text-gray-400 text-sm">Pending Requests</p>
            <h2 className="text-4xl font-bold text-yellow-400 mt-2">
              {stats.pendingRequests}
            </h2>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-green-500 transition">
            <p className="text-gray-400 text-sm">Accepted Swaps</p>
            <h2 className="text-4xl font-bold text-green-400 mt-2">
              {stats.acceptedRequests}
            </h2>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-orange-500 transition">
            <p className="text-gray-400 text-sm">Your Rating</p>
            <h2 className="text-4xl font-bold text-orange-400 mt-2">
              ⭐ {(user?.rating ?? 0).toFixed(1)}
            </h2>
          </div>

        </div>

        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-6">
            Recent Activity
          </h2>

          <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">

            {recentRequests.length > 0 ? (
              recentRequests.map((request) => (
                <div
                  key={request._id}
                  className="flex justify-between items-center px-6 py-5 border-b border-slate-700 last:border-b-0"
                >
                  <div>
                    <p className="font-semibold">
                      {request.skillOffered}
                      {" "}
                      →
                      {" "}
                      {request.skillWanted}
                    </p>

                    <p className="text-gray-400 text-sm mt-1">
                      {new Date(request.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <span
                    className={`px-4 py-1 rounded-full text-sm font-semibold ${
                      request.status === "accepted"
                        ? "bg-green-500/20 text-green-400"
                        : request.status === "pending"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {request.status}
                  </span>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-400">
                No recent activity.
              </div>
            )}

          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-6">Quick Actions</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            <Link
              to="/users"
              className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-cyan-500 transition text-center"
            >
              <div className="text-4xl mb-3">👥</div>
              <h3 className="text-lg font-semibold">Browse Users</h3>
              <p className="text-gray-400 text-sm mt-2">
                Find people to exchange skills.
              </p>
            </Link>

            <Link
              to="/requests"
              className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-green-500 transition text-center"
            >
              <div className="text-4xl mb-3">🤝</div>
              <h3 className="text-lg font-semibold">My Requests</h3>
              <p className="text-gray-400 text-sm mt-2">
                View incoming and outgoing requests.
              </p>
            </Link>

            <Link
              to="/notifications"
              className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-yellow-500 transition text-center"
            >
              <div className="text-4xl mb-3">🔔</div>
              <h3 className="text-lg font-semibold">Notifications</h3>
              <p className="text-gray-400 text-sm mt-2">
                Check your latest updates.
              </p>
            </Link>

            <Link
              to="/edit-profile"
              className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-purple-500 transition text-center"
            >
              <div className="text-4xl mb-3">✏️</div>
              <h3 className="text-lg font-semibold">Edit Profile</h3>
              <p className="text-gray-400 text-sm mt-2">
                Update your profile information.
              </p>
            </Link>

          </div>
        </div>

        <div className="mt-12 bg-slate-800 rounded-xl border border-slate-700 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Profile Completion</h2>

            <span className="text-cyan-400 font-bold">
              {calculateProfileCompletion()}%
            </span>
          </div>

          <div className="w-full bg-slate-700 rounded-full h-3">
            <div
              className="bg-cyan-500 h-3 rounded-full transition-all duration-500"
              style={{
                width: `${calculateProfileCompletion()}%`,
              }}
            ></div>
          </div>

          <p className="text-gray-400 mt-4">
            Complete your profile to improve your chances of finding skill swap partners.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;