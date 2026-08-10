const customerIdMiddleware = (req, res, next) => {
  const customerId = req.header('X-Customer-Id');
  if (!customerId || customerId.trim() === '') {
    return res.status(400).json({ message: 'Missing X-Customer-Id header' });
  }
  req.customerId = customerId.trim();
  next();
};

module.exports = customerIdMiddleware;
