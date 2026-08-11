const Rating = require('../models/Rating');

// @desc    Submit a new rating (Atomic update)
// @route   POST /ratings
const createRating = async (req, res, next) => {
  try {
    const { cakeId, rating } = req.body;
    
    if (!cakeId) {
      return res.status(400).json({ message: 'cakeId is required' });
    }

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'rating must be an integer between 1 and 5' });
    }

    // Atomic update using MongoDB aggregation pipeline in update (Requires MongoDB 4.2+)
    const updatedRating = await Rating.findOneAndUpdate(
      { cakeId },
      [
        {
          $set: {
            totalRatings: { $add: ["$totalRatings", 1] },
            averageRating: {
              $divide: [ 
                { $add: [ { $multiply: ["$averageRating", "$totalRatings"] }, rating ] }, 
                { $add: ["$totalRatings", 1] } 
              ] 
            },
            updatedAt: new Date()
          }
        }
      ],
      { new: true, updatePipeline: true }
    );

    if (!updatedRating) {
      return res.status(404).json({ message: 'Cake not found or unknown cakeId' });
    }
    
    // Round for response only
    const responseData = updatedRating.toObject();
    responseData.averageRating = Math.round(responseData.averageRating * 10) / 10;

    res.status(200).json(responseData);
  } catch (error) {
    next(error);
  }
};

// @desc    Get rating for a specific cake
// @route   GET /ratings/average/:cakeId
const getAverageRating = async (req, res, next) => {
  try {
    const { cakeId } = req.params;

    const ratingDoc = await Rating.findOne({ cakeId });

    if (!ratingDoc) {
      return res.status(404).json({ message: 'Rating not found for this cakeId' });
    }

    res.status(200).json({
      cakeId: ratingDoc.cakeId,
      averageRating: Math.round(ratingDoc.averageRating * 10) / 10,
      totalRatings: ratingDoc.totalRatings
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all ratings
// @route   GET /ratings
const getAllRatings = async (req, res, next) => {
  try {
    const ratings = await Rating.find({}, 'cakeId totalRatings averageRating -_id').lean();
    
    // Round for response
    const formattedRatings = ratings.map(r => ({
      ...r,
      averageRating: Math.round(r.averageRating * 10) / 10
    }));

    res.status(200).json(formattedRatings);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRating,
  getAverageRating,
  getAllRatings
};
