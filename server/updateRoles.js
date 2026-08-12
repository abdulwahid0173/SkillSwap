import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import connectDB from "./config/db.js";
import User from "./models/User.js";

const updateRoles = async () => {
  try {
    await connectDB();

    await User.updateMany(
      { role: { $exists: false } },
      { $set: { role: "user" } }
    );

    await User.updateOne(
      { email: "abdul@example.com" },
      { $set: { role: "admin" } }
    );

    console.log("Roles updated successfully.");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

updateRoles();