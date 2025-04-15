require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  mobile: String,
  password: String,
});

const User = mongoose.model('User', UserSchema);

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
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(5000, () => console.log('🚀 Server running on port 5000'));
