const express = require('express');
const router = express.Router();
const { checkout } = require('../controllers/orderController');
const customerId = require('../middleware/customerId');

router.use(customerId);

router.post('/checkout', checkout);

module.exports = router;
