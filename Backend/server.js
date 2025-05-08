import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Allow CORS from any origin for testing
app.use(cors({
  origin: '*',
}));

app.use(cookieParser());
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.error('❌ MongoDB Error:', err));

// ✅ User Schema
const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  mobile: { type: String },
  password: { type: String, required: true }
}, { timestamps: true });



const User = mongoose.model('User', UserSchema);

// ✅ Auth Route
app.post('/api/auth/login', async (req, res) => {
  const { firstName, lastName, email, mobile, password } = req.body;

  try {
    let user = await User.findOne({ email });

    // ✅ Register if user does not exist
    if (!user) {

      const hashedPassword = await bcrypt.hash(password , 10);
      user = await User.create({ firstName, lastName, email, mobile, password:hashedPassword });

      if (!user) {
        throw new apiError(500, "Something went wrong while registering the user");
      }

      //Payload for jwt token while signup along wiht login
      const payload = {
          id : user._id
      };

      const SECRET_KEY = "pariharIndia" ; 
      const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' }); // 1 hour expiry

      return res.status(201).json({ token , message: 'User registered successfully' });
    }

    // ✅ Validate Password
    const isPasswordValid = bcrypt.compare(password,user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const payload = {
      id : user._id
    };
    const SECRET_KEY = "pariharIndia" ; 
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' }); // 1 hour expiry

    return res.status(201).json({ token , message: 'User Logged in successfully' });

  } catch (err) {
    console.error('Auth Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});



// ✅ Listen on all network interfaces
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
