const express = require('express');
const router = express.Router();
const { createRating, getAverageRating, getAllRatings } = require('../controllers/ratingController');

router.post('/', createRating);
router.get('/', getAllRatings);
router.get('/average/:cakeId', getAverageRating);

module.exports = router;
