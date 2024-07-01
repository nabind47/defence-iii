import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
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

ratingSchema.index({ user: 1, spot: 1 }, { unique: true });

const Rating = mongoose.model("Rating", ratingSchema);

export default Rating;
