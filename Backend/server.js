import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"
import { asyncHandler } from "../src/utils/asyncHandler.js"
import { apiError } from "../src/utils/apiError.js";
import { apiResponse } from '../src/utils/apiResponse.js'
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Allow CORS from any origin for testing
app.use(cors({
  origin: '*',
}));

app.use(cookieParser())
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
  password: { type: String, required: true },
  refreshToken: { type: String, default: null },
}, { timestamps: true });


UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Skip if password is not modified

  this.password = await bcrypt.hash(this.password, 10); // Hash the password with a salt of 10 rounds (ASYNC issue: missing await)
  next(); // Move to next middleware or save process
});

// Method to compare stored password hash with provided password
UserSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password); // Compares input password with hashed password
};

// Method to generate an access token
UserSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id, // User ID
      email: this.email, // User email
      firstName: this.firstName,
      lastName: this.lastName
      // Typo: Should be fullName instead of fullNmae
    },
    process.env.ACCESS_TOKEN_SECRET, // Secret key for signing the token
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY // Token expiry duration
    }
  );
};

// Method to generate a refresh token
UserSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id // User ID only
    },
    process.env.REFRESH_TOKEN_SECRET, // Secret key for signing refresh token
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY // Refresh token expiry duration
    }
  );
};

const User = mongoose.model('User', UserSchema);

// ✅ Auth Route
app.post('/api/auth/login', async (req, res) => {
  const { firstName, lastName, email, mobile, password } = req.body;

  try {
    let user = await User.findOne({ email });

    // ✅ Register if user does not exist
    if (!user) {
      user = await User.create({ firstName, lastName, email, mobile, password });

      const createdUser = await User.findById(user._id).select("-password -refreshToken");
      if (!createdUser) {
        throw new apiError(500, "Something went wrong while registering the user");
      }

      return res.status(201).json({ createdUser, message: 'User registered successfully' });
    }

    // ✅ Validate Password
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // ✅ Generate Tokens
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // ✅ Save refreshToken in DB
    user.refreshToken = refreshToken;
    const updatedUser = await user.save();
    console.log("Updated user with refreshToken:", updatedUser);

    // ✅ Set HTTP-only cookies
    const cookieOptions = {
      httpOnly: true,
      secure: true, // Only send cookies over HTTPS
    };

    // ✅ Return sanitized user + tokens
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    return res
      .status(200)
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .json(
        new apiResponse(200, { user: loggedInUser, accessToken, refreshToken }, "User logged in successfully")
      );

  } catch (err) {
    console.error('Auth Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


const handleRefreshToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new apiError(401, 'Unauthorized request');
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new apiError(401, 'Invalid refresh token');
    }

    if (incomingRefreshToken !== user.refreshToken) {
      throw new apiError(401, 'Refresh token is expired or already used');
    }

    const newRefreshToken = user.generateRefreshToken();
    const accessToken = user.generateAccessToken();

    user.refreshToken = newRefreshToken;
    await user.save({ validateBeforeSave: false });

    const cookieOptions = {
      httpOnly: true,
      secure: true,
    };

    res
      .status(200)
      .cookie('accessToken', accessToken, cookieOptions)
      .cookie('refreshToken', newRefreshToken, cookieOptions)
      .json(
        new apiResponse(200, { accessToken, refreshToken: newRefreshToken }, 'Access token refreshed')
      );
  } catch (error) {
    throw new apiError(401, error?.message || 'Invalid Refresh Token');
  }
});

app.post("/api/auth/refresh", handleRefreshToken);

const getCurrectUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new apiResponse(
        200,
        req.user,
        "currect user fetched successfully"
    ))
});

app.get("/api/auth/me", getCurrectUser)



// ✅ Listen on all network interfaces
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
