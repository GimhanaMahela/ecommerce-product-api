const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    sendTokenResponse(user, 200, res);
  } catch (err) {
    console.error("Registration Error:", err);

    // Handle duplicate email error
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        error: "Email already exists",
      });
    }

    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  // Check for user
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  sendTokenResponse(user, 200, res);
};

// @desc    Get current logged in user
// @route   GET /api/v1/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
};

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  try {
    // Create token with proper expiration
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || "30d" } // Fallback to '30d' if not set
    );

    const options = {
      expires: new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000 // 30 days in milliseconds
      ),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };

    res.status(statusCode).cookie("token", token, options).json({
      success: true,
      token,
    });
  } catch (err) {
    console.error("JWT Error:", err);
    res.status(500).json({
      success: false,
      error: "Authentication failed",
    });
  }
};
