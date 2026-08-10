const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { connectRabbitMQ } = require('./config/rabbitmq');
const errorHandler = require('./middleware/errorHandler');
const notificationRoutes = require('./routes/notificationRoutes');

dotenv.config();

const app = express();
app.use(express.json());

app.use('/notifications', notificationRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3004;

const startServer = async () => {
  await connectDB();
  await connectRabbitMQ();
  
  app.listen(PORT, () => {
    console.log(`Notification Service running on port ${PORT}`);
  });
};

startServer();
