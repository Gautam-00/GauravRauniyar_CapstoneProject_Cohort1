const Notification = require('../models/Notification');

// @desc    Get all notifications for the customer
// @route   GET /notifications
const getNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find({ customerId: req.customerId }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getNotifications
};
