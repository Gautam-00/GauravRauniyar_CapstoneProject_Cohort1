const mongoose = require('mongoose');

const basketItemSchema = new mongoose.Schema({
  cakeId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 }
}, { _id: false });

const basketSchema = new mongoose.Schema({
  customerId: { type: String, required: true, unique: true },
  items: [basketItemSchema]
}, { timestamps: true });

module.exports = mongoose.model('Basket', basketSchema);
