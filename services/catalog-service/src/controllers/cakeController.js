const Cake = require('../models/Cake');

// GET /cakes
const getCakes = async (req, res, next) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;
    
    // Build query object
    const query = {};
    
    if (name) {
      query.name = { $regex: name, $options: 'i' }; // Case-insensitive match
    }
    
    if (category) {
      query.category = { $regex: category, $options: 'i' };
    }
    
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    
    const cakes = await Cake.find(query);
    res.json(cakes);
  } catch (error) {
    next(error);
  }
};

// GET /cakes/:id
const getCakeById = async (req, res, next) => {
  try {
    const cake = await Cake.findById(req.params.id);
    
    if (cake) {
      res.json(cake);
    } else {
      res.status(404).json({ message: 'Cake not found' });
    }
  } catch (error) {
    // Graceful handling of invalid ID format (non-ObjectId)
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid Cake ID format' });
    }
    next(error);
  }
};

module.exports = {
  getCakes,
  getCakeById
};
