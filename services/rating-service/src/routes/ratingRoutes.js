const express = require('express');
const router = express.Router();
const { createRating, getAverageRating } = require('../controllers/ratingController');

router.post('/', createRating);
router.get('/average/:cakeId', getAverageRating);

module.exports = router;
