require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const basketRoutes = require('./routes/basketRoutes');
const orderRoutes = require('./routes/orderRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3002;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/order_db';
process.env.MONGO_URI = MONGO_URI;

const startServer = async () => {
  await connectDB();

  app.use('/basket', basketRoutes);
  app.use('/', orderRoutes); // /checkout
  
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Order Service running on port ${PORT}`);
  });
};

startServer();
