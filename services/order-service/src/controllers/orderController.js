const Basket = require('../models/Basket');
const Order = require('../models/Order');
const crypto = require('crypto');
const { publishOrderCompleted } = require('../services/rabbitmqPublisher');

// POST /checkout
const checkout = async (req, res, next) => {
  try {
    const { customerName, email, address, contactNo } = req.body;

    if (!customerName || !email || !address || !contactNo) {
      return res.status(400).json({ message: 'customerName, email, address, and contactNo are required' });
    }

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
      customerName,
      email,
      address,
      contactNo,
      items: basket.items,
      totalAmount,
      status: "COMPLETED" // Ready for future RabbitMQ event
    });

    await order.save();

    // Clear basket
    await Basket.deleteOne({ _id: basket._id });

    // Publish ORDER_COMPLETED event to RabbitMQ
    const eventPayload = {
      eventId: crypto.randomUUID(),
      orderId: order._id.toString(),
      customerId: req.customerId,
      customerName,
      items: basket.items.map(i => ({ name: i.name, quantity: i.quantity })),
      totalAmount,
      timestamp: new Date().toISOString()
    };
    
    await publishOrderCompleted(eventPayload);

    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

module.exports = { checkout };
