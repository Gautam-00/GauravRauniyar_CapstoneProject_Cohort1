const express = require('express');
const router = express.Router();
const { getCakes, getCakeById } = require('../controllers/cakeController');

router.get('/', getCakes);
router.get('/:id', getCakeById);

module.exports = router;
