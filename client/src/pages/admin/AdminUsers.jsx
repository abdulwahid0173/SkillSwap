import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import api from "../../services/api";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data.users);
    } catch (error) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await api.delete(`/admin/users/${id}`);

      toast.success("User deleted");

      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed");
    }
  };

  useEffect(() => {
    fetchUsers();
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
        Manage Users
      </h1>

      <div className="overflow-x-auto">

        <table className="w-full bg-slate-800 rounded-xl overflow-hidden">

          <thead className="bg-slate-700">

            <tr>

              <th className="p-4 text-left">Name</th>

              <th className="p-4 text-left">Username</th>

              <th className="p-4 text-left">Email</th>

              <th className="p-4 text-left">Role</th>

              <th className="p-4 text-center">Action</th>

            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr
                key={user._id}
                className="border-b border-slate-700"
              >

                <td className="p-4">{user.fullName}</td>

                <td className="p-4">@{user.username}</td>

                <td className="p-4">{user.email}</td>

                <td className="p-4 capitalize">{user.role}</td>

                <td className="p-4 text-center">

                  <button
                    onClick={() => deleteUser(user._id)}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default AdminUsers;