import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";
import { toast, Toaster } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import RateModal from "../components/RateModal";

const Requests = () => {
  const { user } = useAuth();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const fetchRequests = async () => {
    try {
      const res = await api.get("/swaps");
      setRequests(res.data.swapRequests || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

    const handleAccept = async (id) => {
      try {
        setActionLoading(true);

        await api.put(`/swaps/${id}/accept`);

        toast.success("Request accepted");
        fetchRequests();
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed");
      } finally {
        setActionLoading(false);
      }
    };

    const handleReject = async (id) => {
        try {
            await api.put(`/swaps/${id}/reject`);

            toast.success("Request rejected");

            fetchRequests();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed");
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/swaps/${id}`);

            toast.success("Request deleted");

            fetchRequests();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed");
        }
    };

    const handleRate = async (data) => {
        try {
            await api.put(`/swaps/${selectedRequest}/rate`, data);

            toast.success("Review submitted");

            setShowModal(false);

            fetchRequests();

        } catch (error) {
            toast.error(error.response?.data?.message || "Failed");
        }
    };

  useEffect(() => {
    fetchRequests();
  }, []);

  const incomingRequests = requests.filter(
    (request) => request.receiver?._id === user?._id
  );

  const outgoingRequests = requests.filter(
    (request) => request.sender?._id === user?._id
  );

  const getStatusColor = (status) => {
    if (status === "accepted") return "text-green-400";
    if (status === "rejected") return "text-red-400";
    return "text-yellow-400";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="h-14 w-14 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" />

      <div className="min-h-screen bg-slate-900 text-white">
        <Navbar />

        <div className="max-w-6xl mx-auto p-6">

          <h1 className="text-4xl font-bold text-cyan-400 mb-10">
            My Swap Requests
          </h1>

          {/* Incoming Requests */}

          <div className="mb-12">

            <h2 className="text-3xl font-semibold mb-6">
              📥 Incoming Requests
            </h2>

            {incomingRequests.length === 0 ? (
              <div className="bg-slate-800 rounded-xl p-6 text-gray-400">
                No incoming requests.
              </div>
            ) : (
              <div className="grid gap-6">

                {incomingRequests.map((request) => (

                  <div
                    key={request._id}
                    className="bg-slate-800 rounded-xl p-6 shadow-lg"
                  >

                    <h3 className="text-2xl font-bold text-cyan-400">
                      {request.sender?.fullName}
                    </h3>

                    <p className="text-gray-400 mb-4">
                      @{request.sender?.username}
                    </p>

                    <p className="mb-2">
                      <strong>Skill Offered:</strong>{" "}
                      {request.skillOffered}
                    </p>

                    <p className="mb-2">
                      <strong>Skill Wanted:</strong>{" "}
                      {request.skillWanted}
                    </p>

                    <p className="mb-2">
                      <strong>Message:</strong>{" "}
                      {request.message || "No message"}
                    </p>

                    <p className="mb-4">
                      <strong>Status:</strong>{" "}
                      <span className={getStatusColor(request.status)}>
                        {request.status.toUpperCase()}
                      </span>
                    </p>

                    {request.status === "pending" && (
                      <div className="mt-6 flex gap-4">
                        <button
                            onClick={() => handleAccept(request._id)}
                            className="bg-green-500 hover:bg-green-600 px-5 py-2 rounded-lg"
                        >
                            Accept
                        </button>
                        <button
                            onClick={() => handleReject(request._id)}
                            className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg"
                        >
                            Reject
                        </button>
                      </div>
                    )}

                  </div>

                ))}

              </div>
            )}

          </div>

          {/* Outgoing Requests */}

          <div>

            <h2 className="text-3xl font-semibold mb-6">
              📤 Outgoing Requests
            </h2>

            {outgoingRequests.length === 0 ? (
              <div className="bg-slate-800 rounded-xl p-6 text-gray-400">
                No outgoing requests.
              </div>
            ) : (
              <div className="grid gap-6">

                {outgoingRequests.map((request) => (

                  <div
                    key={request._id}
                    className="bg-slate-800 rounded-xl p-6 shadow-lg"
                  >

                    <h3 className="text-2xl font-bold text-cyan-400">
                      {request.receiver?.fullName}
                    </h3>

                    <p className="text-gray-400 mb-4">
                      @{request.receiver?.username}
                    </p>

                    <p className="mb-2">
                      <strong>Skill Offered:</strong>{" "}
                      {request.skillOffered}
                    </p>

                    <p className="mb-2">
                      <strong>Skill Wanted:</strong>{" "}
                      {request.skillWanted}
                    </p>

                    <p className="mb-2">
                      <strong>Message:</strong>{" "}
                      {request.message || "No message"}
                    </p>

                    <p className="mb-4">
                      <strong>Status:</strong>{" "}
                      <span className={getStatusColor(request.status)}>
                        {request.status.toUpperCase()}
                      </span>
                    </p>

                    {request.status === "pending" && (
                        <button
                            onClick={() => handleDelete(request._id)}
                            className="mt-6 bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg"
                        >
                            Delete Request
                        </button>
                    )}

                    {request.status === "accepted" && (
                        <button
                            onClick={() => {
                                setSelectedRequest(request._id);
                                setShowModal(true);
                            }}
                            className="mt-6 bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded-lg"
                        >
                            Rate User
                        </button>
                    )}

                  </div>

                ))}

              </div>
            )}

          </div>

        </div>
      </div>

      <RateModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleRate}
      />

    </>
  );
};

export default Requests;