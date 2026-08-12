import express from "express";

import { getDashboardStats, getAllUsers, deleteUser, getAllSwaps, deleteSwap,} from "../controllers/adminController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

router.use(authMiddleware);
router.use(adminMiddleware);

router.get("/stats", getDashboardStats);

router.get("/users", getAllUsers);

router.delete("/users/:id", deleteUser);

router.get("/swaps", getAllSwaps);

router.delete("/swaps/:id", deleteSwap);

export default router;