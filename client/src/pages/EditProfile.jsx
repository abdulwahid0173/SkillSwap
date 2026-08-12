import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    bio: "",
    location: "",
    college: "",
    github: "",
    linkedin: "",
    portfolio: "",
    skillsOffered: "",
    skillsWanted: "",
  });

  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  const fetchProfile = async () => {
    try {
      const res = await api.get("/users/profile");

      setFormData({
        fullName: res.data.user.fullName || "",
        bio: res.data.user.bio || "",
        location: res.data.user.location || "",
        college: res.data.user.college || "",
        github: res.data.user.github || "",
        linkedin: res.data.user.linkedin || "",
        portfolio: res.data.user.portfolio || "",
        skillsOffered: (res.data.user.skillsOffered || []).join(", "),
        skillsWanted: (res.data.user.skillsWanted || []).join(", "),
      });

      setPreviewImage(res.data.user.profileImage || "");

    } catch (error) {
      toast.error("Failed to load profile");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.put("/users/profile", {
        ...formData,
        skillsOffered: formData.skillsOffered
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),

        skillsWanted: formData.skillsWanted
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
      });

      if (image) {
        const imageData = new FormData();
        imageData.append("profileImage", image);
        await api.put("/users/profile/image", imageData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      toast.success("Profile Updated");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (error) {
      toast.error(error.response?.data?.message || "Update Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />

      <div className="min-h-screen bg-slate-900 text-white">

        <Navbar />

        <div className="max-w-3xl mx-auto py-10">

          <div className="bg-slate-800 rounded-xl p-8">

            <h1 className="text-3xl font-bold text-cyan-400 mb-8">
              Edit Profile
            </h1>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full p-3 rounded bg-slate-700"
              />

              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Bio"
                rows="4"
                className="w-full p-3 rounded bg-slate-700"
              />

              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location"
                className="w-full p-3 rounded bg-slate-700"
              />

              <input
                name="college"
                value={formData.college}
                onChange={handleChange}
                placeholder="College"
                className="w-full p-3 rounded bg-slate-700"
              />

              <input
                name="github"
                value={formData.github}
                onChange={handleChange}
                placeholder="GitHub URL"
                className="w-full p-3 rounded bg-slate-700"
              />

              <input
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                placeholder="LinkedIn URL"
                className="w-full p-3 rounded bg-slate-700"
              />

              <input
                name="portfolio"
                value={formData.portfolio}
                onChange={handleChange}
                placeholder="Portfolio URL"
                className="w-full p-3 rounded bg-slate-700"
              />

              <input
                name="skillsOffered"
                value={formData.skillsOffered}
                onChange={handleChange}
                placeholder="Skills Offered (comma separated)"
                className="w-full p-3 rounded bg-slate-700"
              />

              <input
                name="skillsWanted"
                value={formData.skillsWanted}
                onChange={handleChange}
                placeholder="Skills Wanted (comma separated)"
                className="w-full p-3 rounded bg-slate-700"
              />

                <div>
                    <div className="flex justify-center mb-5">
                        <img
                            src={
                                image
                                    ? URL.createObjectURL(image)
                                    : previewImage || "https://ui-avatars.com/api/?name=User"
                            }
                            alt="Profile Preview"
                            className="w-32 h-32 rounded-full object-cover"
                        />
                    </div>
                    <label className="block mb-2 text-white">
                        Profile Image
                    </label>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="w-full p-3 rounded bg-slate-700"
                    />
                </div>

              <button
                disabled={loading}
                className="w-full bg-cyan-500 hover:bg-cyan-600 py-3 rounded-lg"
              >
                {loading ? "Updating..." : "Update Profile"}
              </button>

            </form>

          </div>

        </div>

      </div>
    </>
  );
};

export default EditProfile;