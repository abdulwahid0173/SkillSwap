import { Link } from "react-router-dom";

const UserCard = ({ user }) => {
  return (
    <div className="bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-cyan-500/20 transition">

      <div className="flex justify-center mb-5">
        <img
          src={
            user.profileImage ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName)}&background=0D8ABC&color=fff&size=256`
          }
          alt={user.fullName}
          className="w-24 h-24 rounded-full object-cover border-4 border-cyan-500"
        />
      </div>

      <h2 className="text-2xl font-bold text-cyan-400 text-center">
        {user.fullName}
      </h2>

      <p className="text-center text-gray-400 mb-4">
        @{user.username}
      </p>

      <p className="mb-2">
        <strong>Email:</strong>{" "}
        {user.email || "Not Added"}
      </p>

      <p className="mb-2">
        <strong>Location:</strong>{" "}
        {user.location || "Not Added"}
      </p>

      <Link
        to={`/users/${user._id}`}
        className="block text-center mt-6 bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-lg"
      >
        View Profile
      </Link>

    </div>
  );
};

export default UserCard;