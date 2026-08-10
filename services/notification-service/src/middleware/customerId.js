const customerId = (req, res, next) => {
  const custId = req.header('X-Customer-Id');
  if (!custId) {
    return res.status(400).json({ message: 'Missing X-Customer-Id header' });
  }
  req.customerId = custId;
  next();
};

module.exports = customerId;
