// server.js
import { Order } from './models/Order.js';
import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import cookieParser from "cookie-parser"



dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


const allowedOrigins = ['http://localhost:5173', 'https://www.pariharindia.com', "https://parihar-project.vercel.app/", 'https://pariharproject-production.up.railway.app/'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));


app.use(cookieParser());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.error('❌ MongoDB Error:', err));

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  mobile: { type: String },
  dob: { type: Date, default: null },
  bio : {type:String , default : "Hello i am a valued customer of Parihar India." },
  address : {type : String , default : "xyz city , abc country"},
  password: { type: String, required: true }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

const FeedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true , unique : true},
  rating: { type: String , required:true},
  feedback: { type: String, required: true }
}, { timestamps: true });

const Feedback = mongoose.model("Feedback" , FeedbackSchema); 



// Login/Register Endpoint
app.post('/api/auth/login', async (req, res) => {
  const { firstName, lastName, email, mobile, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user = await User.create({ firstName, lastName, email, mobile, password: hashedPassword });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      token,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        mobile: user.mobile,
      }
    });
  } catch (err) {
    console.error('Auth Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Profile (protected)
app.get('/api/auth/profile', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

app.post('/api/feedback' , async(req,res)=>
{
    const authHeader = req.headers['authorization']; // e.g., 'Bearer <token>'
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your secret
      req.user = decoded; // Attach user info to the request
    } catch (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }


    try
    {
        const{name , email , rating , message} = req.body;

        if(!name || !email ||!rating ||!message)
        {
            return res.status(400).json({
              success : "false",
              message : "All fields are mandatory."
            })
        }

        const response = await Feedback.create({
          name,
          email,
          rating,
          feedback : message
        })

        return res.status(200).json({
          success:true,
          message :"Feedback is successfully submitted"
        })

    }catch(e)
    {
        console.log('Error occured.');
        console.log(e);
         return res.status(400).json({
              success : "false",
              message : "Internal server problem."
        })
    }
})

app.post('/api/updateProfile' , async(req,res)=>
{
    const authHeader = req.headers['authorization']; // e.g., 'Bearer <token>'
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your secret
      req.user = decoded; // Attach user info to the request
    } catch (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }

    try
    { 
        const{firstName , lastName , email , address , bio , dob , mobile}  = req.body;

        if(!firstName || !lastName || !email || !address || !bio || !dob || !mobile)
        {
            return res.status(400).json({
              success:false,
              message:"All fields are mandatory."
            })
        }

        const response = await User.findOneAndUpdate(
          { email: email },          
          { $set: { firstName , lastName ,email , address , bio , dob , mobile } }, 
          { new: true }               
        );

        return res.status(200).json({
          success:true,
          message : "Successfully updated."
        })

    }catch(e)
    {
        console.log("ERROR OCCURED WHILE UPDATING THE PROFILE DETAILS : ");
        console.log(e);

        return res.status(500).json({
          success : false,
          message : "Internal server problem"
        })

    }
})

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

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
