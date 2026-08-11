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
    
    // 1. Fetch cakes from Catalog DB
    let cakes = await Cake.find(query).lean(); // Use .lean() to easily attach properties

    // 2. Fetch rating aggregates from Rating Service
    const ratingServiceUrl = process.env.RATING_SERVICE_URL || 'http://localhost:3003';
    const ratingResponse = await fetch(`${ratingServiceUrl}/ratings`);

    if (!ratingResponse.ok) {
      // Explicitly throw an error if Rating Service fails (network or HTTP error)
      const err = new Error(`Rating Service responded with status ${ratingResponse.status}`);
      err.status = ratingResponse.status;
      throw err;
    }

    const ratingData = await ratingResponse.json();

    // 3. Create a lookup map
    const ratingMap = new Map();
    ratingData.forEach(r => {
      ratingMap.set(r.cakeId, {
        totalRatings: r.totalRatings,
        averageRating: r.averageRating
      });
    });

    // 4. Enrich cakes with response-only rating object
    cakes = cakes.map(cake => {
      const rating = ratingMap.get(cake._id.toString()) || { totalRatings: 0, averageRating: 0 };
      return {
        ...cake,
        rating
      };
    });
    
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
