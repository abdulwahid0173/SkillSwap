import { Link } from "react-router-dom";
import { HomeIcon } from "@heroicons/react/24/outline";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-6">
      <div className="text-center max-w-lg">

        <h1 className="text-8xl md:text-9xl font-extrabold text-cyan-500">
          404
        </h1>

        <h2 className="mt-4 text-3xl md:text-4xl font-bold text-white">
          Page Not Found
        </h2>

        <p className="mt-4 text-gray-400 text-lg">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 mt-8 bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          <HomeIcon className="w-5 h-5" />
          Back to Dashboard
        </Link>

      </div>
    </div>
  );
};

export default NotFound;