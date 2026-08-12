import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import api from "../services/api";

const UserProfile = () => {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);

  const [formData, setFormData] = useState({
    skillOffered: "",
    skillWanted: "",
    message: "",
  });

  const [loading, setLoading] = useState(false); // Button loading
  const [pageLoading, setPageLoading] = useState(true); // Page loading

  const fetchUser = async () => {
    try {
      const res = await api.get(`/users/${id}`);
      setUser(res.data.user);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load user.");
    }
  };

  const fetchUserReviews = async () => {
    try {
      const res = await api.get(`/swaps/${id}/reviews`);
      setReviews(res.data.reviews);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([
          fetchUser(),
          fetchUserReviews(),
        ]);
      } finally {
        setPageLoading(false);
      }
    };

    loadData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!formData.skillOffered || !formData.skillWanted) {
      toast.error("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/swaps", {
        receiver: user._id,
        skillOffered: formData.skillOffered,
        skillWanted: formData.skillWanted,
        message: formData.message,
      });

      toast.success("Swap request sent successfully!");

      setFormData({
        skillOffered: "",
        skillWanted: "",
        message: "",
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to send swap request."
      );
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="h-14 w-14 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">User Not Found</h2>
          <p className="text-gray-400">
            The requested user profile does not exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" />

      <div className="min-h-screen bg-slate-900 text-white">
        <Navbar />

        <div className="max-w-5xl mx-auto p-6">

          <div className="bg-slate-800 rounded-xl p-8 shadow-lg">

            {/* Profile Header */}

            <div className="flex items-center gap-6 mb-8">

              <img
                src={
                  user.profileImage ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user.fullName
                  )}`
                }
                alt={user.fullName}
                className="w-32 h-32 rounded-full object-cover border-4 border-cyan-500"
              />

              <div>
                <h1 className="text-4xl font-bold text-cyan-400">
                  {user.fullName}
                </h1>

                <p className="text-gray-400 mt-2">
                  @{user.username}
                </p>
              </div>

            </div>

            {/* Basic Info */}

            <p className="mb-2">
              <strong>Email:</strong> {user.email}
            </p>

            <p className="mb-2">
              <strong>Location:</strong> {user.location || "Not Added"}
            </p>

            <p>
                <strong>Rating:</strong>{" "}
                ⭐ {user.rating ? user.rating.toFixed(1) : "No Ratings Yet"}
            </p>

            <p>
                <strong>Completed Swaps:</strong> {user.completedSwaps}
            </p>

            <p className="mb-2">
              <strong>College:</strong> {user.college || "Not Added"}
            </p>

            {/* Social Links */}

            {user.github && (
              <p className="mb-2">
                <strong>GitHub:</strong>{" "}
                <a
                  href={user.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-400 hover:underline"
                >
                  View GitHub
                </a>
              </p>
            )}

            {user.linkedin && (
              <p className="mb-2">
                <strong>LinkedIn:</strong>{" "}
                <a
                  href={user.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-400 hover:underline"
                >
                  View LinkedIn
                </a>
              </p>
            )}

            {user.portfolio && (
              <p className="mb-2">
                <strong>Portfolio:</strong>{" "}
                <a
                  href={user.portfolio}
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-400 hover:underline"
                >
                  Visit Portfolio
                </a>
              </p>
            )}

            {/* Bio */}

            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-3">
                Bio
              </h2>

              <p className="text-gray-300">
                {user.bio || "No bio added."}
              </p>
            </div>

            {/* Skills Offered */}

            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-3">
                Skills Offered
              </h2>

              <div className="flex flex-wrap gap-2">
                {user.skillsOffered?.length ? (
                  user.skillsOffered.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-cyan-600 px-4 py-2 rounded-full"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-400">
                    No skills added.
                  </p>
                )}
              </div>
            </div>

            {/* Skills Wanted */}

            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-green-400 mb-3">
                Skills Wanted
              </h2>

              <div className="flex flex-wrap gap-2">
                {user.skillsWanted?.length ? (
                  user.skillsWanted.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-green-600 px-4 py-2 rounded-full"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-400">
                    No skills added.
                  </p>
                )}
              </div>
            </div>

            {/* Ratings & Reviews */}

            <div className="mt-10">
                <h2 className="text-2xl font-semibold text-cyan-400 mb-4">
                    Ratings & Reviews
                </h2>

                <div className="mb-6">
                    <span className="text-3xl font-bold text-yellow-400">
                    ⭐ {user.rating?.toFixed(1) || "0.0"}
                    </span>

                    <span className="text-gray-400 ml-2">
                    ({user.ratings?.length || 0} Reviews)
                    </span>
                </div>

                {user.ratings?.length ? (
                    <div className="space-y-4">
                    {user.ratings.map((item, index) => (
                        <div
                        key={index}
                        className="bg-slate-700 rounded-lg p-4"
                        >
                        <div className="flex items-center gap-3">

                            <img
                            src={
                                item.user?.profileImage ||
                                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                item.user?.fullName || "User"
                                )}`
                            }
                            alt={item.user?.fullName}
                            className="w-12 h-12 rounded-full object-cover"
                            />

                            <div>
                            <h3 className="font-semibold">
                                {item.user?.fullName}
                            </h3>

                            <p className="text-yellow-400">
                                {"⭐".repeat(item.rating)}
                            </p>
                            </div>

                        </div>

                        {item.review && (
                            <p className="mt-3 text-gray-300">
                            {item.review}
                            </p>
                        )}
                        </div>
                    ))}
                    </div>
                ) : (
                    <p className="text-gray-400">
                    No reviews yet.
                    </p>
                )}
            </div>

            {/* Send Request */}

            <div className="mt-10">

              <h2 className="text-2xl font-semibold mb-5 text-cyan-400">
                Send Swap Request
              </h2>

              <div className="space-y-4">

                <input
                  type="text"
                  name="skillOffered"
                  placeholder="Skill You Offer"
                  value={formData.skillOffered}
                  onChange={handleChange}
                  className="w-full bg-slate-700 p-3 rounded-lg outline-none"
                />

                <input
                  type="text"
                  name="skillWanted"
                  placeholder="Skill You Want"
                  value={formData.skillWanted}
                  onChange={handleChange}
                  className="w-full bg-slate-700 p-3 rounded-lg outline-none"
                />

                <textarea
                  rows="4"
                  name="message"
                  placeholder="Write a message..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-slate-700 p-3 rounded-lg outline-none"
                />

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-lg font-semibold transition"
                >
                  {loading ? "Sending..." : "Send Swap Request"}
                </button>

              </div>

            </div>

            <div className="mt-10">
                <h2 className="text-2xl font-semibold mb-6">
                    Reviews
                </h2>

                {reviews.length === 0 ? (
                    <p className="text-gray-400">
                    No reviews yet.
                    </p>
                ) : (
                    <div className="space-y-5">
                    {reviews.map((review) => (
                        <div
                        key={review._id}
                        className="bg-slate-700 rounded-lg p-5"
                        >
                        <div className="flex items-center gap-4 mb-3">
                            <img
                            src={
                                review.sender.profileImage ||
                                "https://ui-avatars.com/api/?name=User"
                            }
                            alt={review.sender.fullName}
                            className="w-12 h-12 rounded-full object-cover"
                            />

                            <div>
                            <h3 className="font-semibold">
                                {review.sender.fullName}
                            </h3>

                            <p className="text-yellow-400">
                                {"⭐".repeat(review.rating)}
                            </p>
                            </div>
                        </div>

                        <p className="text-gray-300">
                            {review.review || "No review provided."}
                        </p>
                        </div>
                    ))}
                    </div>
                )}
            </div>

          </div>

        </div>
      </div>
    </>
  );
};

export default UserProfile;