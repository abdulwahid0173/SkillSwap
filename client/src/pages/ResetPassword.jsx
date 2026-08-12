import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post(`/auth/reset-password/${token}`, {
        password,
      });

      toast.success(res.data.message);

      navigate("/login");
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
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New Password"
            className="w-full p-3 rounded-lg bg-slate-700 text-white mb-4 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-3 rounded-lg bg-slate-700 text-white mb-6 outline-none"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-600 py-3 rounded-lg text-white font-semibold"
          >
            {loading ? "Updating..." : "Reset Password"}
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

export default ResetPassword;