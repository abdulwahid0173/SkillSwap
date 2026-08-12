import { useState } from "react";

const RateModal = ({ isOpen, onClose, onSubmit }) => {
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmit({
      rating,
      review,
    });

    setReview("");
    setRating(5);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

      <div className="bg-slate-800 rounded-xl p-8 w-[420px]">

        <h2 className="text-2xl font-bold text-cyan-400 mb-6">
          Rate User
        </h2>

        <label className="block mb-2">
          Rating
        </label>

        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full bg-slate-700 p-3 rounded-lg mb-5"
        >
          <option value={5}>⭐⭐⭐⭐⭐</option>
          <option value={4}>⭐⭐⭐⭐</option>
          <option value={3}>⭐⭐⭐</option>
          <option value={2}>⭐⭐</option>
          <option value={1}>⭐</option>
        </select>

        <label className="block mb-2">
          Review
        </label>

        <textarea
          rows="4"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review..."
          className="w-full bg-slate-700 rounded-lg p-3 mb-6"
        />

        <div className="flex justify-end gap-4">

          <button
            onClick={onClose}
            className="bg-gray-500 px-5 py-2 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-cyan-500 px-5 py-2 rounded-lg"
          >
            Submit
          </button>

        </div>

      </div>

    </div>
  );
};

export default RateModal;