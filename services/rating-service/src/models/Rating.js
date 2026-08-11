const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  cakeId: {
    type: String,
    required: [true, 'cakeId is required'],
    unique: true
  },
  totalRatings: {
    type: Number,
    default: 0
  },
  averageRating: {
    type: Number,
    default: 0
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;
