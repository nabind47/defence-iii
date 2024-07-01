import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    spot: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ParkingSpot",
      required: true,
    },
  },
  { timestamps: true }
);

feedbackSchema.index({ user: 1, spot: 1 }, { unique: true });

const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;
