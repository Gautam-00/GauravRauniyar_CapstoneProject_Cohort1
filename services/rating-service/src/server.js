const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const ratingRoutes = require('./routes/ratingRoutes');

dotenv.config();

connectDB();

const app = express();
app.use(express.json());

app.use('/ratings', ratingRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
  console.log(`Rating Service running on port ${PORT}`);
});
