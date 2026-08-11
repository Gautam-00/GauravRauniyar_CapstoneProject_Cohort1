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

// @desc    Mark unread notifications as read
// @route   PATCH /notifications/read
const markAsRead = async (req, res, next) => {
  try {
    await Notification.updateMany(
      { customerId: req.customerId, read: false },
      { $set: { read: true } }
    );
    res.status(200).json({ message: 'Notifications marked as read' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getNotifications,
  markAsRead
};
