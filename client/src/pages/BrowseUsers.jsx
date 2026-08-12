import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";
import UserCard from "../components/UserCard";
import { useAuth } from "../context/AuthContext";

const BrowseUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const { user: currentUser } = useAuth();

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data.users);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users
  .filter((user) => user._id !== currentUser?._id)
  .filter((user) => {
    const text = search.toLowerCase();

    return (
      user.fullName.toLowerCase().includes(text) ||
      user.username.toLowerCase().includes(text) ||
      user.skillsOffered?.some((skill) =>
        skill.toLowerCase().includes(text)
      ) ||
      user.skillsWanted?.some((skill) =>
        skill.toLowerCase().includes(text)
      )
    );
  });

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

      <div className="max-w-6xl mx-auto p-6">

        <h1 className="text-4xl font-bold mb-8">
          Browse Users
        </h1>

        <div className="mb-8">
          <input
            type="text"
            placeholder="Search by name, username or skill..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-96 p-3 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {filteredUsers.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <UserCard
                key={user._id}
                user={user}
              />
            ))}
          </div>
        ) : (
          <div className="text-center mt-16">
            <h2 className="text-2xl font-semibold text-gray-300">
              No users found
            </h2>

            <p className="text-gray-500 mt-2">
              Try searching with another name or skill.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default BrowseUsers;