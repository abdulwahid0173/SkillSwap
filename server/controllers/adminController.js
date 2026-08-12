import User from "../models/User.js";
import SwapRequest from "../models/SwapRequest.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalSwaps = await SwapRequest.countDocuments();

    const pendingRequests = await SwapRequest.countDocuments({
      status: "pending",
    });

    const completedSwaps = await SwapRequest.countDocuments({
      status: "accepted",
    });

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalSwaps,
        pendingRequests,
        completedSwaps,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Delete all swaps related to this user
    await SwapRequest.deleteMany({
      $or: [
        { sender: userId },
        { receiver: userId },
      ],
    });

    // Delete the user
    await User.findByIdAndDelete(userId);

    res.json({
      success: true,
      message: "User and related swaps deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllSwaps = async (req, res) => {
  try {
    const swaps = await SwapRequest.find()
      .populate("sender", "fullName username")
      .populate("receiver", "fullName username");

    res.json({
      success: true,
      swaps,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteSwap = async (req, res) => {
  try {
    await SwapRequest.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Swap deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};