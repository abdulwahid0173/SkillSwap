import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const res = await api.get("/notifications");
      setNotifications(res.data.notifications);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load notifications");
    }
  };

  const markAllAsRead = async () => {
    try {
      await api.put("/notifications/read-all");
    } catch (error) {
      console.error(error);
      toast.error("Failed to mark notifications as read");
    }
  };

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        await fetchNotifications();
        await markAllAsRead();
      } finally {
        setLoading(false);
      }
    };

    loadNotifications();
  }, []);

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

      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-5xl font-bold mb-10">Notifications</h1>

        {notifications.length === 0 ? (
          <div className="bg-slate-800 rounded-xl p-8 text-center">
            <p className="text-gray-400 text-lg">
              No notifications yet.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification._id}
                className={`rounded-xl p-6 border transition ${
                  notification.isRead
                    ? "bg-slate-800 border-slate-700"
                    : "bg-cyan-900/20 border-cyan-500"
                }`}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={
                      notification.sender?.profileImage ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        notification.sender?.fullName || "User"
                      )}`
                    }
                    alt={notification.sender?.fullName}
                    className="w-14 h-14 rounded-full object-cover"
                  />

                  <div className="flex-1">
                    <p>
                      <span className="font-semibold text-cyan-400">
                        {notification.sender?.fullName}
                      </span>{" "}
                      {notification.message}
                    </p>

                    <p className="text-sm text-gray-400 mt-1">
                      {new Date(notification.createdAt).toLocaleString()}
                    </p>
                  </div>

                  {!notification.isRead && (
                    <span className="w-3 h-3 bg-cyan-400 rounded-full"></span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;