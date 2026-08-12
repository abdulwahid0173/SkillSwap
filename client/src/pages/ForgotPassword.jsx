import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/auth/forgot-password", {
        email,
      });

      toast.success(res.data.message);
      setEmail("");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex justify-center items-center px-4">
      <div className="bg-slate-800 p-8 rounded-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 rounded-lg bg-slate-700 text-white mb-5 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-600 py-3 rounded-lg text-white font-semibold"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <div className="text-center mt-5">
          <Link
            to="/login"
            className="text-cyan-400 hover:underline"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;