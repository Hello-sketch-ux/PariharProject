import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Order } from '../models/Order';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection with error handling
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });

// Order endpoint with detailed error logging
app.post('/api/orders', async (req, res) => {
  try {
    console.log('Received order data:', req.body);
    const order = new Order(req.body);
    const savedOrder = await order.save();
    console.log('Order saved successfully:', savedOrder);
    res.status(201).json({ success: true, order: savedOrder });
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message,
      details: error
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});