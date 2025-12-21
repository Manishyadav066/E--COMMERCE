const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
console.log('Current NODE_ENV:', process.env.NODE_ENV);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('MongoDB Connection Error:', err.message);
    console.log('Running in offline mode (some features may not work)');
  }
};
connectDB();

// Routes Placeholder
// app.get('/', (req, res) => {
//   res.send('API is running...');
// });

// Import Routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');

const orderRoutes = require('./routes/orderRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

const path = require('path');

// Serve static assets in production
// Only if we are in production OR if we want to test the build locally
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));

  app.get(/(.*)/, (req, res) =>
    res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
