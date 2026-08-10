const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  cakeId: {
    type: String,
    required: [true, 'cakeId is required']
  },
  rating: {
    type: Number,
    required: [true, 'rating is required'],
    min: [1, 'rating must be between 1 and 5'],
    max: [5, 'rating must be between 1 and 5'],
    validate: {
      validator: Number.isInteger,
      message: 'rating must be an integer'
    }
  },
  comment: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;
