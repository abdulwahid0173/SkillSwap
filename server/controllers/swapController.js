import SwapRequest from "../models/SwapRequest.js";
import User from "../models/User.js";
import Notification from "../models/Notification.js";

export const sendSwapRequest = async (req, res) => {
  try {
    const { receiver, skillOffered, skillWanted, message } = req.body;

    if (!receiver || !skillOffered || !skillWanted) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // Prevent sending request to yourself
    if (receiver.toString() === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot send a request to yourself",
      });
    }

    const swapRequest = new SwapRequest({
      sender: req.user._id,
      receiver,
      skillOffered,
      skillWanted,
      message,
    });

    await swapRequest.save();

    // Get sender details
    const sender = await User.findById(req.user._id);

    await Notification.create({
      receiver,
      sender: req.user._id,
      type: "swap_request",
      message: `${sender.fullName} has sent you a swap request.`,
    });

    res.status(201).json({
      success: true,
      message: "Swap request sent successfully",
      swapRequest,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMySwapRequests = async (req, res) => {
  try {
    const swapRequests = await SwapRequest.find({
      $or: [
        { sender: req.user._id },
        { receiver: req.user._id },
      ],
    })
      .populate("sender", "fullName username profileImage")
      .populate("receiver", "fullName username profileImage")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: swapRequests.length,
      swapRequests,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const acceptSwapRequest = async (req, res) => {
  try {
    const swapRequest = await SwapRequest.findById(req.params.id);

    if (!swapRequest) {
      return res.status(404).json({
        success: false,
        message: "Swap request not found",
      });
    }

    if (swapRequest.receiver.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to accept this request",
      });
    }

    swapRequest.status = "accepted";
    await swapRequest.save();

    // Get receiver details
    const receiverUser = await User.findById(req.user._id);

    // Create a notification for the sender
    await Notification.create({
      receiver: swapRequest.sender,
      sender: req.user._id,
      type: "accepted",
      message: `${receiverUser.fullName} has accepted your swap request.`,
    });

    res.status(200).json({
      success: true,
      message: "Swap request accepted",
      swapRequest,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const rejectSwapRequest = async (req, res) => {
  try {
    const swapRequest = await SwapRequest.findById(req.params.id);

    if (!swapRequest) {
      return res.status(404).json({
        success: false,
        message: "Swap request not found",
      });
    }

    if (swapRequest.receiver.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to reject this request",
      });
    }

    swapRequest.status = "rejected";
    await swapRequest.save();

    // Get receiver details
    const receiverUser = await User.findById(req.user._id);

    // Create a notification for the sender
    await Notification.create({
      receiver: swapRequest.sender,
      sender: req.user._id,
      type: "rejected",
      message: `${receiverUser.fullName} has rejected your swap request.`,
    });

    res.status(200).json({
      success: true,
      message: "Swap request rejected",
      swapRequest,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteSwapRequest = async (req, res) => {
  try {
    const swapRequest = await SwapRequest.findById(req.params.id);

    if (!swapRequest) {
      return res.status(404).json({
        success: false,
        message: "Swap request not found",
      });
    }

    if (swapRequest.sender.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this request",
      });
    }

    if (swapRequest.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Only pending requests can be deleted",
      });
    }

    await SwapRequest.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Swap request deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const rateSwapRequest = async (req, res) => {
  try {
    const { rating, review } = req.body;

    const swapRequest = await SwapRequest.findById(req.params.id);

    if (!swapRequest) {
      return res.status(404).json({
        success: false,
        message: "Swap request not found",
      });
    }

    if (swapRequest.status !== "accepted") {
      return res.status(400).json({
        success: false,
        message: "Only accepted swaps can be rated",
      });
    }

    if (
      swapRequest.sender.toString() !== req.user._id.toString() &&
      swapRequest.receiver.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    if (swapRequest.rating) {
      return res.status(400).json({
        success: false,
        message: "This swap has already been rated.",
      });
    }

    // Save rating in swap request
    swapRequest.rating = rating;
    swapRequest.review = review || "";
    await swapRequest.save();

    // Decide who is being rated
    const ratedUserId =
      swapRequest.sender.toString() === req.user._id.toString()
        ? swapRequest.receiver
        : swapRequest.sender;

    // Calculate average rating
    const reviews = await SwapRequest.find({
      receiver: ratedUserId,
      status: "accepted",
      rating: { $gt: 0 },
    });

    const totalRating = reviews.reduce(
      (sum, item) => sum + item.rating,
      0
    );

    const averageRating =
      reviews.length > 0 ? totalRating / reviews.length : 0;

    // Update rated user's profile
    await User.findByIdAndUpdate(
      ratedUserId,
      {
        rating: Number(averageRating.toFixed(1)),
        completedSwaps: reviews.length,
        $push: {
          ratings: {
            user: req.user._id,
            rating,
            review: review || "",
          },
        },
      },
      {
        runValidators: true,
      }
    );

    // Get the person who submitted the rating
    const rater = await User.findById(req.user._id);

    // Create notification
    await Notification.create({
      receiver: ratedUserId,
      sender: req.user._id,
      type: "rating",
      message: `${rater.fullName} rated you ${rating} ⭐`,
    });

    res.status(200).json({
      success: true,
      message: "Rating submitted successfully.",
      averageRating: Number(averageRating.toFixed(1)),
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUserReviews = async (req, res) => {
  try {
    const reviews = await SwapRequest.find({
      $or: [
        { sender: req.params.id },
        { receiver: req.params.id },
      ],
      status: "accepted",
      rating: { $gt: 0 },
    })
      .populate("sender", "fullName profileImage")
      .populate("receiver", "fullName profileImage")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getPendingRequestCount = async (req, res) => {
  try {
    const count = await SwapRequest.countDocuments({
      receiver: req.user._id,
      status: "pending",
    });

    res.status(200).json({
      success: true,
      count,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getNotificationCount = async (req, res) => {
  try {
    const count = await SwapRequest.countDocuments({
      receiver: req.user._id,
      status: "pending",
    });

    res.status(200).json({
      success: true,
      count,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};