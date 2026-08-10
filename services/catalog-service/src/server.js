require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const seedDatabase = require('./seed/seeder');
const cakeRoutes = require('./routes/cakeRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/cake_catalog_db';
process.env.MONGO_URI = MONGO_URI;

const startServer = async () => {
  await connectDB();
  await seedDatabase();

  app.use('/cakes', cakeRoutes);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Cake Catalog Service running on port ${PORT}`);
  });
};

startServer();
