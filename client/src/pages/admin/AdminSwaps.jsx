import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import api from "../../services/api";

const AdminSwaps = () => {
  const [swaps, setSwaps] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSwaps = async () => {
    try {
      const res = await api.get("/admin/swaps");
      setSwaps(res.data.swaps);
    } catch (error) {
      toast.error("Failed to load swap requests");
    } finally {
      setLoading(false);
    }
  };

  const deleteSwap = async (id) => {
    if (!window.confirm("Delete this swap request?")) return;

    try {
      await api.delete(`/admin/swaps/${id}`);

      toast.success("Swap deleted");

      setSwaps(swaps.filter((swap) => swap._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed");
    }
  };

  useEffect(() => {
    fetchSwaps();
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
        Manage Swap Requests
      </h1>

      <div className="overflow-x-auto">

        <table className="w-full bg-slate-800 rounded-xl overflow-hidden">

          <thead className="bg-slate-700">

            <tr>
              <th className="p-4">Sender</th>
              <th className="p-4">Receiver</th>
              <th className="p-4">Skill Offered</th>
              <th className="p-4">Skill Wanted</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>

          </thead>

          <tbody>

            {swaps.map((swap) => (

              <tr
                key={swap._id}
                className="border-b border-slate-700 text-center"
              >

                <td className="p-4">
                  {swap.sender?.fullName}
                </td>

                <td className="p-4">
                  {swap.receiver?.fullName}
                </td>

                <td className="p-4">
                  {swap.skillOffered}
                </td>

                <td className="p-4">
                  {swap.skillWanted}
                </td>

                <td className="p-4 capitalize">
                  {swap.status}
                </td>

                <td className="p-4">

                  <button
                    onClick={() => deleteSwap(swap._id)}
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

export default AdminSwaps;