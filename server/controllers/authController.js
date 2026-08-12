import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";

export const register = async (req, res) => {
  try {
    const {
      fullName,
      username,
      email,
      password,
    } = req.body;

    // Check if all fields are provided
    if (!fullName || !username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields.",
      });
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already exists.",
      });
    }

    // Check if username already exists
    const existingUsername = await User.findOne({ username });

    if (existingUsername) {
      return res.status(400).json({
        success: false,
        message: "Username already exists.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      fullName,
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully.",
      user,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if fields are provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields.",
      });
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // Remove password before sending response
    const userData = user.toObject();
    delete userData.password;

    res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: userData,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Hash token before saving
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 minutes

    await user.save();

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    await sendEmail({
      email: user.email,
      subject: "SkillSwap Password Reset",
      message: `
        <h2>Password Reset</h2>
        <p>You requested to reset your password.</p>
        <a href="${resetUrl}">
          Reset Password
        </a>
        <p>This link expires in 15 minutes.</p>
      `,
    });

    res.status(200).json({
      success: true,
      message: "Password reset link sent to your email.",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token.",
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successful.",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};