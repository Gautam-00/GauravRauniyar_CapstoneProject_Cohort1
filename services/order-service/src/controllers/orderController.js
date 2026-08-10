const Basket = require('../models/Basket');
const Order = require('../models/Order');
const crypto = require('crypto');
const { publishOrderCompleted } = require('../services/rabbitmqPublisher');

// POST /checkout
const checkout = async (req, res, next) => {
  try {
    const basket = await Basket.findOne({ customerId: req.customerId });
    
    if (!basket || basket.items.length === 0) {
      return res.status(400).json({ message: 'Basket is empty' });
    }

    // Calculate total from snapshotted prices
    let totalAmount = 0;
    basket.items.forEach(item => {
      totalAmount += (item.price * item.quantity);
    });

    const order = new Order({
      customerId: req.customerId,
      items: basket.items,
      totalAmount,
      status: "COMPLETED" // Ready for future RabbitMQ event
    });

    await order.save();

    // Clear basket
    // Consistency Limitation: If this delete fails, the order exists but basket isn't cleared.
    // MVP accepts this risk.
    await Basket.deleteOne({ _id: basket._id });

    // Publish ORDER_COMPLETED event to RabbitMQ
    const eventPayload = {
      eventId: crypto.randomUUID(),
      orderId: order._id.toString(),
      customerId: req.customerId,
      totalAmount,
      timestamp: new Date().toISOString()
    };
    
    // MVP Consistency Limitation: Fire and forget.
    // If publish fails, order is placed but notification is never sent.
    await publishOrderCompleted(eventPayload);

    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

module.exports = { checkout };
