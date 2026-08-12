import express from "express";
import { getProfile, updateProfile, uploadProfileImage, getAllUsers, getUserById} from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/", protect, getAllUsers);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.put("/profile/image", protect, upload.single("profileImage"), uploadProfileImage);
router.get("/:id", protect, getUserById);

export default router;