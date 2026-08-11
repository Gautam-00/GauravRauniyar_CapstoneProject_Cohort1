const Basket = require('../models/Basket');
const catalogClient = require('../services/catalogClient');

// Helper for quantity validation
const isValidQuantity = (q) => {
  return typeof q === 'number' && Number.isInteger(q) && q > 0;
};

// GET /basket
const getBasket = async (req, res, next) => {
  try {
    const basket = await Basket.findOne({ customerId: req.customerId });
    if (!basket) {
      // Virtual empty basket
      return res.json({ customerId: req.customerId, items: [] });
    }
    res.json(basket);
  } catch (error) {
    next(error);
  }
};

// POST /basket/items
const addItem = async (req, res, next) => {
  try {
    const { cakeId, quantity } = req.body;

    if (!isValidQuantity(quantity)) {
      return res.status(400).json({ message: 'Quantity must be a positive integer' });
    }

    // Check if basket exists
    let basket = await Basket.findOne({ customerId: req.customerId });
    if (!basket) {
      basket = new Basket({ customerId: req.customerId, items: [] });
    }

    // Check if cake already in basket
    const existingItemIndex = basket.items.findIndex(item => item.cakeId === cakeId);
    
    if (existingItemIndex > -1) {
      // Increment quantity
      basket.items[existingItemIndex].quantity += quantity;
    } else {
      // Call catalog
      const result = await catalogClient.getCakeDetails(cakeId);
      if (result.error) {
        let status = 500;
        if (result.error === 'NOT_FOUND') status = 404;
        if (result.error === 'BAD_REQUEST') status = 400;
        if (result.error === 'UNAVAILABLE') status = 503;
        
        // Custom unavailable case overrides 503 if it's out of stock
        if (result.message === 'Cake is currently unavailable') status = 400;

        return res.status(status).json({ message: result.message });
      }

      basket.items.push({
        cakeId: result.cake._id,
        name: result.cake.name,
        price: result.cake.price, // SNAPSHOT
        imageUrl: result.cake.imageUrl,
        quantity: quantity
      });
    }

    await basket.save();
    res.json(basket);
  } catch (error) {
    next(error);
  }
};

// PUT /basket/items/:cakeId
const updateItem = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const { cakeId } = req.params;

    if (!isValidQuantity(quantity)) {
      return res.status(400).json({ message: 'Quantity must be a positive integer' });
    }

    const basket = await Basket.findOne({ customerId: req.customerId });
    if (!basket) {
      return res.status(404).json({ message: 'Basket not found' });
    }

    const item = basket.items.find(i => i.cakeId === cakeId);
    if (!item) {
      return res.status(404).json({ message: 'Cake not found in basket' });
    }

    item.quantity = quantity;
    await basket.save();
    res.json(basket);
  } catch (error) {
    next(error);
  }
};

// DELETE /basket/items/:cakeId
const removeItem = async (req, res, next) => {
  try {
    const { cakeId } = req.params;
    
    const basket = await Basket.findOne({ customerId: req.customerId });
    if (!basket) {
      return res.status(404).json({ message: 'Basket not found' });
    }

    const itemIndex = basket.items.findIndex(i => i.cakeId === cakeId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Cake not found in basket' });
    }

    basket.items.splice(itemIndex, 1);
    await basket.save();
    res.json(basket);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBasket,
  addItem,
  updateItem,
  removeItem
};
