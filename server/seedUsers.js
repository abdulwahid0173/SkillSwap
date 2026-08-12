import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcrypt";
import mongoose from "mongoose";

import connectDB from "./config/db.js";
import User from "./models/User.js";

connectDB();

const seedUsers = async () => {
  try {
    await User.deleteMany({
      email: {
        $in: [
          "rahul@example.com",
          "priya@example.com",
          "amit@example.com",
          "sneha@example.com",
          "karan@example.com",
          "ananya@example.com",
          "rohit@example.com",
          "neha@example.com",
          "vikram@example.com",
          "meera@example.com",
        ],
      },
    });

    const password = await bcrypt.hash("123456", 10);

    const users = [
      {
        fullName: "Rahul Sharma",
        username: "rahul",
        email: "rahul@example.com",
        password,
        bio: "Frontend developer passionate about React.",
        location: "Delhi",
        college: "Delhi University",
        skillsOffered: ["React", "JavaScript", "HTML", "CSS"],
        skillsWanted: ["Node.js", "MongoDB"],
        rating: 4.8,
        completedSwaps: 8,
        profileImage: "https://i.pravatar.cc/300?img=11",
      },
      {
        fullName: "Priya Verma",
        username: "priya",
        email: "priya@example.com",
        password,
        bio: "UI/UX Designer.",
        location: "Mumbai",
        college: "Mumbai University",
        skillsOffered: ["Figma", "UI Design"],
        skillsWanted: ["React"],
        rating: 4.7,
        completedSwaps: 6,
        profileImage: "https://i.pravatar.cc/300?img=12",
      },
      {
        fullName: "Amit Singh",
        username: "amit",
        email: "amit@example.com",
        password,
        bio: "Backend Developer.",
        location: "Lucknow",
        college: "AKTU",
        skillsOffered: ["Node.js", "Express", "MongoDB"],
        skillsWanted: ["React"],
        rating: 4.9,
        completedSwaps: 12,
        profileImage: "https://i.pravatar.cc/300?img=13",
      },
      {
        fullName: "Sneha Patel",
        username: "sneha",
        email: "sneha@example.com",
        password,
        bio: "Android Developer.",
        location: "Ahmedabad",
        college: "Nirma University",
        skillsOffered: ["Kotlin", "Android"],
        skillsWanted: ["Flutter"],
        rating: 4.6,
        completedSwaps: 5,
        profileImage: "https://i.pravatar.cc/300?img=14",
      },
      {
        fullName: "Karan Mehta",
        username: "karan",
        email: "karan@example.com",
        password,
        bio: "Machine Learning Enthusiast.",
        location: "Pune",
        college: "MIT Pune",
        skillsOffered: ["Python", "Machine Learning"],
        skillsWanted: ["React"],
        rating: 4.8,
        completedSwaps: 7,
        profileImage: "https://i.pravatar.cc/300?img=15",
      },
      {
        fullName: "Ananya Roy",
        username: "ananya",
        email: "ananya@example.com",
        password,
        bio: "Python Developer.",
        location: "Kolkata",
        college: "Jadavpur University",
        skillsOffered: ["Python", "Django"],
        skillsWanted: ["Docker"],
        rating: 4.5,
        completedSwaps: 4,
        profileImage: "https://i.pravatar.cc/300?img=16",
      },
      {
        fullName: "Rohit Gupta",
        username: "rohit",
        email: "rohit@example.com",
        password,
        bio: "DevOps Engineer.",
        location: "Noida",
        college: "Amity University",
        skillsOffered: ["Docker", "AWS"],
        skillsWanted: ["Kubernetes"],
        rating: 4.9,
        completedSwaps: 10,
        profileImage: "https://i.pravatar.cc/300?img=17",
      },
      {
        fullName: "Neha Kapoor",
        username: "neha",
        email: "neha@example.com",
        password,
        bio: "Data Analyst.",
        location: "Chandigarh",
        college: "PU Chandigarh",
        skillsOffered: ["SQL", "Power BI"],
        skillsWanted: ["Python"],
        rating: 4.7,
        completedSwaps: 9,
        profileImage: "https://i.pravatar.cc/300?img=18",
      },
      {
        fullName: "Vikram Joshi",
        username: "vikram",
        email: "vikram@example.com",
        password,
        bio: "Cloud Engineer.",
        location: "Bangalore",
        college: "RV College",
        skillsOffered: ["AWS", "Azure"],
        skillsWanted: ["Terraform"],
        rating: 4.8,
        completedSwaps: 11,
        profileImage: "https://i.pravatar.cc/300?img=19",
      },
      {
        fullName: "Meera Nair",
        username: "meera",
        email: "meera@example.com",
        password,
        bio: "Full Stack Developer.",
        location: "Kochi",
        college: "CUSAT",
        skillsOffered: ["MERN Stack"],
        skillsWanted: ["Next.js"],
        rating: 5.0,
        completedSwaps: 15,
        profileImage: "https://i.pravatar.cc/300?img=20",
      },
    ];

    await User.insertMany(users);

    console.log("10 demo users inserted successfully.");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedUsers();