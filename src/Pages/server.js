import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Allow CORS from any origin for testing
app.use(cors({
  origin: '*',
}));

app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.error('❌ MongoDB Error:', err));

// ✅ User Schema
const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  mobile: String,
  password: String,
});

const User = mongoose.model('User', UserSchema);

// ✅ Auth Route
app.post('/api/auth/login', async (req, res) => {
  const { firstName, lastName, email, mobile, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ firstName, lastName, email, mobile, password });
      await user.save();
      return res.status(201).json({ message: 'User registered successfully' });
    }

    res.status(200).json({ message: 'User already exists' });
  } catch (err) {
    console.error('Auth Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Listen on all network interfaces
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
