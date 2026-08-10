const Rating = require('../models/Rating');

// @desc    Submit a new rating
// @route   POST /ratings
const createRating = async (req, res, next) => {
  try {
    const { cakeId, rating, comment } = req.body;
    
    // Explicit check for missing cakeId or rating so it correctly throws 400.
    // Mongoose validation will also handle this, but for exact error strings
    // we can rely on mongoose ValidationError.
    
    const newRating = new Rating({
      cakeId,
      rating,
      comment
    });

    const savedRating = await newRating.save();
    res.status(201).json(savedRating);
  } catch (error) {
    next(error);
  }
};

// @desc    Get the average rating for a specific cake
// @route   GET /ratings/average/:cakeId
const getAverageRating = async (req, res, next) => {
  try {
    const { cakeId } = req.params;

    const result = await Rating.aggregate([
      { $match: { cakeId } },
      { 
        $group: { 
          _id: null, 
          averageRating: { $avg: '$rating' }, 
          totalRatings: { $sum: 1 } 
        } 
      }
    ]);

    if (result.length === 0) {
      return res.status(200).json({
        cakeId,
        averageRating: 0,
        totalRatings: 0
      });
    }

    res.status(200).json({
      cakeId,
      averageRating: result[0].averageRating,
      totalRatings: result[0].totalRatings
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRating,
  getAverageRating
};
