const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

//
// ✅ Register User
//
exports.registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;   // ✅ role included

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: 'User already exists' });

    // Mongoose pre-save hook hashes password
    const user = await User.create({ name, email, password, role });

    // Create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    });

    res.status(201).json({
      message: 'User registered successfully ✅',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,     // ✅ ADDED
      },
    });
  } catch (err) {
    console.error('Register error:', err);
    next(err);
  }
};


//
// ✅ Login User
//
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: 'Invalid email or password' });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid email or password' });

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    });

    res.status(200).json({
      message: 'Login successful ✅',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,      // ✅ ADDED
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    next(err);
  }
};
