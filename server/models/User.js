import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    profileImage: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },

    college: {
      type: String,
      default: "",
    },

    github: {
      type: String,
      default: "",
    },

    linkedin: {
      type: String,
      default: "",
    },

    portfolio: {
      type: String,
      default: "",
    },
    resetPasswordToken: {
      type: String,
    },

    resetPasswordExpire: {
      type: Date,
    },
    
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    skillsOffered: [
      {
        type: String,
      },
    ],

    skillsWanted: [
      {
        type: String,
      },
    ],

    ratings: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },

        rating: {
          type: Number,
          required: true,
          min: 1,
          max: 5,
        },

        review: {
          type: String,
          default: "",
        },

        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    rating: {
      type: Number,
      default: 0,
    },
    completedSwaps: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;