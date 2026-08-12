import User from "../models/User.js";

export const getProfile = async (req, res) => {
  try {
    // req.user comes from authMiddleware
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const {
      fullName,
      bio,
      location,
      college,
      github,
      linkedin,
      portfolio,
      skillsOffered,
      skillsWanted,
      profileImage,
    } = req.body;

    const updateData = {
      fullName,
      bio,
      location,
      college,
      github,
      linkedin,
      portfolio,
      skillsOffered,
      skillsWanted,
      profileImage,
    };

    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key]
    );

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image.",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        profileImage: req.file.path,
      },
      {
        new: true,
      }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile image uploaded successfully.",
      imageUrl: req.file.path,
      user,
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
    const { skill, location } = req.query;

    let filter = {
      _id: { $ne: req.user._id },
    };

    if (skill) {
      filter.skillsOffered = {
        $regex: skill,
        $options: "i",
      };
    }

    if (location) {
      filter.location = {
        $regex: location,
        $options: "i",
      };
    }

    const users = await User.find(filter).select(
      "fullName username email profileImage bio location skillsOffered skillsWanted rating completedSwaps"
    );

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password")
      .populate("ratings.user", "fullName profileImage");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};