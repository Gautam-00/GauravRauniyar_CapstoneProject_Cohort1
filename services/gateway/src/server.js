const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for local development
app.use(cors());

// Minimal health endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'up' });
});

// Helper for proxy options
const createProxyConfig = (target, pathRewriteRules, pathPrefix) => {
  const config = {
    target,
    changeOrigin: true,
    on: {
      error: (err, req, res) => {
        console.error(`Proxy Error on ${pathPrefix}:`, err.message || err.code);
        res.status(503).json({
          message: 'Downstream service unavailable',
          error: err.message || err.code || 'Unknown error'
        });
      }
    }
  };
  if (pathRewriteRules) {
    config.pathRewrite = pathRewriteRules;
  }
  return config;
};

// Route mappings
const catalogUrl = process.env.CATALOG_SERVICE_URL || 'http://localhost:3001';
const orderUrl = process.env.ORDER_SERVICE_URL || 'http://localhost:3002';
const ratingUrl = process.env.RATING_SERVICE_URL || 'http://localhost:3003';
const notificationUrl = process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:3004';

app.use('/api/catalog', createProxyMiddleware(createProxyConfig(catalogUrl, null, '/api/catalog')));
app.use('/api/orders', createProxyMiddleware(createProxyConfig(orderUrl, null, '/api/orders')));
app.use('/api/ratings', createProxyMiddleware(createProxyConfig(ratingUrl, { '^/': '/ratings/' }, '/api/ratings')));
app.use('/api/notifications', createProxyMiddleware(createProxyConfig(notificationUrl, { '^/': '/notifications/' }, '/api/notifications')));

// Fallback for unsupported routes
app.use((req, res) => {
  res.status(404).json({ message: 'Gateway Route Not Found' });
});

app.listen(PORT, () => {
  console.log(`Express Gateway running on port ${PORT}`);
});
