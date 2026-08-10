const Basket = require('../models/Basket');
const Order = require('../models/Order');

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

    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

module.exports = { checkout };
