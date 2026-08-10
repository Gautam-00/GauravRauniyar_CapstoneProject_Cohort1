const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  cakeId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 }
}, { _id: false });

const orderSchema = new mongoose.Schema({
  customerId: { type: String, required: true },
  items: [orderItemSchema],
  totalAmount: { type: Number, required: true, min: 0 },
  status: { type: String, default: "COMPLETED" }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
