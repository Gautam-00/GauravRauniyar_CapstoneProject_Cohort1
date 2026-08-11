const express = require('express');
const router = express.Router();
const { getNotifications, markAsRead } = require('../controllers/notificationController');
const customerId = require('../middleware/customerId');

router.get('/', customerId, getNotifications);
router.patch('/read', customerId, markAsRead);

module.exports = router;
