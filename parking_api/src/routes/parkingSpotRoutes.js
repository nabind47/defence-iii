import express from "express";

import authenticate from "../middlewares/authMiddleware.js";
import authorize from "../middlewares/authorizeMiddleware.js";

import {
  NearestParking,
  createParkingSpot,
  deleteParkingSpot,
  getParkingSpot,
  getParkingSpots,
  getTotalSpots,
  handleFeedback,
  updateAvaliability,
  updateParkingSpot,
} from "../controllers/parkingSpotController.js";

import {
  createFeedback,
  deleteFeedback,
  getFeedbacksBySpot,
  getFeedbacksByUser,
  updateFeedback,
} from "../controllers/feedbackController.js";

const router = express.Router();

router.post("/", authenticate, authorize, createParkingSpot);

router.get("/", getParkingSpots);
router.get("/NearestParking", NearestParking);
router.get("/:id", getParkingSpot);
router.get("/p/total", getTotalSpots);

router.put("/:id/avaliability", authenticate, authorize, updateAvaliability);

router.put("/:id", authenticate, authorize, updateParkingSpot);
router.delete("/:id", authenticate, authorize, deleteParkingSpot);
router.post("/feeback", handleFeedback);

router.use(authenticate);

// FEEDBACKS
router.post("/:id/feedbacks", createFeedback);
router.get("/:id/feedbacks", getFeedbacksBySpot);
router.get("/:id/feedbacks/:userId", getFeedbacksByUser);

router.put("/:id/feedbacks/:feedbackId", updateFeedback);
router.delete("/:id/feedbacks/:feedbackId", deleteFeedback);

export default router;
