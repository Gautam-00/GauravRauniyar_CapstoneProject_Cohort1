const express = require('express');
const router = express.Router();
const { getNotifications } = require('../controllers/notificationController');
const customerId = require('../middleware/customerId');

router.get('/', customerId, getNotifications);

module.exports = router;
