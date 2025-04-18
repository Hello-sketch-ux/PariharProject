import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.error('❌ MongoDB Error:', err));

// User Schema
const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  mobile: String,
  password: String,
});

const User = mongoose.model('User', UserSchema);

// Auth Route
app.post('/api/auth/login', async (req, res) => {
  const { firstName, lastName, email, mobile, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      // Register user
      user = new User({ firstName, lastName, email, mobile, password });
      await user.save();
      return res.status(201).json({ message: 'User registered successfully' });
    }

    // If user already exists
    res.status(200).json({ message: 'User already exists' });
  } catch (err) {
    console.error('Auth Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
