import Rating from "../models/Rating.js";

export const createRating = async (req, res) => {
  const user = req.user.userId;
  const spot = req.params.id;

  try {
    const existingRating = await Rating.findOne({ user, spot });
    if (existingRating) {
      return res
        .status(400)
        .json({ message: "User has already rated this spot" });
    }

    await Rating.create({ rating: parseInt(req.body.rating), user, spot });
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: "Error creating rating" });
  }
};

export const getRatingsBySpot = async (req, res) => {
  const spot = req.params.id;

  try {
    const ratings = await Rating.find({ spot }).populate("user", "_id name");
    res.status(200).json({ ratings });
  } catch (error) {
    res.status(500).json({ message: "Error fetching ratings for spot" });
  }
};

export const getRatingsByUser = async (req, res) => {
  const user = req.params.userId;

  try {
    const ratings = await Rating.find({ user }).populate("user", "_id name");
    res.status(200).json({ ratings });
  } catch (error) {
    res.status(500).json({ message: "Error fetching ratings for user" });
  }
};

export const updateRating = async (req, res) => {
  const ratingId = req.params.ratingId;

  try {
    const updatedRating = await Rating.findByIdAndUpdate(
      ratingId,
      { rating: parseInt(req.body.rating) },
      { new: true }
    );
    if (!updatedRating) {
      return res.status(404).json({ message: "Rating not found" });
    }

    res.status(200).json({ rating: updatedRating });
  } catch (error) {
    res.status(500).json({ message: "Error updating rating" });
  }
};

export const deleteRating = async (req, res) => {
  const ratingId = req.params.ratingId;

  try {
    const deletedRating = await Rating.findByIdAndDelete(ratingId);
    if (!deletedRating) {
      return res.status(404).json({ message: "Rating not found" });
    }

    res.status(200).json({ message: "Rating deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting rating" });
  }
};
