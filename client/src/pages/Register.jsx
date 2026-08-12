import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast";

import api from "../services/api";

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.username ||
      !formData.email ||
      !formData.password
    ) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/register", formData);

      toast.success(res.data.message);

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />

      <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">

        <div className="bg-slate-800 rounded-2xl shadow-xl p-8 w-full max-w-md">

          <h1 className="text-4xl font-bold text-center text-white mb-2">
            SkillSwap
          </h1>

          <p className="text-center text-gray-400 mb-8">
            Create a new account
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div className="relative">
              <FiUser className="absolute left-4 top-4 text-gray-400" />

              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                className="w-full pl-11 pr-4 py-3 rounded-lg bg-slate-700 text-white outline-none"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            <div className="relative">
              <FiUser className="absolute left-4 top-4 text-gray-400" />

              <input
                type="text"
                name="username"
                placeholder="Username"
                className="w-full pl-11 pr-4 py-3 rounded-lg bg-slate-700 text-white outline-none"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            <div className="relative">
              <FiMail className="absolute left-4 top-4 text-gray-400" />

              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full pl-11 pr-4 py-3 rounded-lg bg-slate-700 text-white outline-none"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="relative">
              <FiLock className="absolute left-4 top-4 text-gray-400" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full pl-11 pr-12 py-3 rounded-lg bg-slate-700 text-white outline-none"
                value={formData.password}
                onChange={handleChange}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4 text-gray-400"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button
              className="w-full bg-cyan-500 hover:bg-cyan-600 transition py-3 rounded-lg font-semibold text-white"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Register"}
            </button>

          </form>

          <p className="text-center text-gray-400 mt-6">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-cyan-400 hover:underline"
            >
              Login
            </Link>
          </p>

        </div>

      </div>
    </>
  );
};

export default Register;