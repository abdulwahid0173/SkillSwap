import express from "express";
import protect from "../middleware/authMiddleware.js";
import {sendSwapRequest, getMySwapRequests, acceptSwapRequest, rejectSwapRequest, deleteSwapRequest, rateSwapRequest, getUserReviews, getPendingRequestCount, getNotificationCount} from "../controllers/swapController.js";
const router = express.Router();

router.post("/", protect, sendSwapRequest);
router.get("/", protect, getMySwapRequests);
router.get("/notification-count", protect, getNotificationCount);
router.put("/:id/accept", protect, acceptSwapRequest);
router.put("/:id/reject", protect, rejectSwapRequest);
router.delete("/:id", protect, deleteSwapRequest);
router.put("/:id/rate", protect, rateSwapRequest);
router.get("/:id/reviews", protect, getUserReviews);
router.get("/pending-count", protect, getPendingRequestCount);

export default router;