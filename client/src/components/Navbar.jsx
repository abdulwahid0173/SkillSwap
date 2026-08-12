import { Fragment, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { UserCircleIcon, ArrowRightOnRectangleIcon, PencilSquareIcon, ArrowsRightLeftIcon, HomeIcon,} from "@heroicons/react/24/outline";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [unreadCount, setUnreadCount] = useState(0);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const fetchUnreadCount = async () => {
    try {
      const res = await api.get("/notifications");

      const unread = res.data.notifications.filter(
        (item) => !item.isRead
      ).length;

      setUnreadCount(unread);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 5000); // Fetch every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const navClass = (path) =>
    location.pathname === path
      ? "text-cyan-400 font-semibold"
      : "text-white hover:text-cyan-400 transition";

  return (
    <nav className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/dashboard"
          className="text-2xl lg:text-3xl font-bold text-cyan-400"
        >
          SkillSwap
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-5 lg:gap-8">

          <Link
            to="/dashboard"
            className={`flex items-center gap-2 ${navClass("/dashboard")}`}
          >
            <HomeIcon className="w-5 h-5" />
            Dashboard
          </Link>

          <Link
            to="/users"
            className={`flex items-center gap-2 ${navClass("/users")}`}
          >
            <UserCircleIcon className="w-5 h-5" />
            Browse Users
          </Link>

          <Link
            to="/requests"
            className={`flex items-center gap-2 ${navClass("/requests")}`}
          >
            <ArrowsRightLeftIcon className="w-5 h-5" />
            Requests
          </Link>

          <Link
            to="/notifications"
            className={`relative flex items-center gap-2 ${navClass("/notifications")}`}
          >
            Notifications

            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs font-bold min-w-5 h-5 px-1 rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </Link>

        </div>

        {/* Profile Dropdown */}
        <Menu as="div" className="relative">

          <Menu.Button className="flex items-center gap-3 rounded-lg px-2 py-1 hover:bg-slate-700 transition">

            <img
              src={
                user?.profileImage ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  user?.fullName || "User"
                )}`
              }
              alt={user?.fullName}
              className="w-11 h-11 rounded-full object-cover border-2 border-cyan-400"
            />

            <div className="hidden sm:block text-left">

              <p className="text-cyan-400 font-semibold">
                {user?.fullName}
              </p>

              <p className="text-xs text-gray-400">
                @{user?.username}
              </p>

            </div>

          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-150"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-100"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >

            <Menu.Items className="absolute right-0 mt-3 w-64 bg-slate-800 rounded-xl shadow-xl border border-slate-700 focus:outline-none">

              <div className="px-5 py-4 border-b border-slate-700">

                <p className="text-white font-semibold">
                  {user?.fullName}
                </p>

                <p className="text-sm text-gray-400">
                  @{user?.username}
                </p>

              </div>

              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/dashboard"
                    className={`flex items-center gap-3 px-5 py-3 ${
                      active ? "bg-slate-700" : ""
                    }`}
                  >
                    <HomeIcon className="w-5 h-5" />
                    Dashboard
                  </Link>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/users"
                    className={`flex items-center gap-3 px-5 py-3 ${
                      active ? "bg-slate-700" : ""
                    }`}
                  >
                    <UserCircleIcon className="w-5 h-5" />
                    Browse Users
                  </Link>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/edit-profile"
                    className={`flex items-center gap-3 px-5 py-3 ${
                      active ? "bg-slate-700" : ""
                    }`}
                  >
                    <PencilSquareIcon className="w-5 h-5" />
                    Edit Profile
                  </Link>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/requests"
                    className={`flex items-center gap-3 px-5 py-3 ${
                      active ? "bg-slate-700" : ""
                    }`}
                  >
                    <ArrowsRightLeftIcon className="w-5 h-5" />
                    Requests
                  </Link>
                )}
              </Menu.Item>

              <div className="border-t border-slate-700">

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-5 py-3 text-red-400 hover:bg-slate-700 transition"
                >
                  <ArrowRightOnRectangleIcon className="w-5 h-5" />
                  Logout
                </button>

              </div>

            </Menu.Items>

          </Transition>

        </Menu>

      </div>
    </nav>
  );
};

export default Navbar;