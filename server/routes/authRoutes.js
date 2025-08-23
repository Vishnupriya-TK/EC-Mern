import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { protect, adminOnly } from '../middleware/auth.js';
import crypto from 'crypto';
import { sendResetEmail } from '../utils/emailService.js';

const router = express.Router();

// Generate token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Token expires in 30 days
  });
};

// Generate and hash password token
const getResetPasswordToken = () => {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex');
  
  // Hash token and set to resetPasswordToken field
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set expire (10 minutes)
  const resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

  return { resetToken, resetPasswordToken, resetPasswordExpire };
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user (default role is 'user' as per schema)
    const user = await User.create({
      name,
      email,
      password, // Password will be hashed by the pre-save hook
    });

    // Generate JWT
    const token = generateToken(user._id, user.role);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    res.status(400).json({ message: 'Invalid user data', error: error.message });
  }
});

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = generateToken(user._id, user.role);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
router.put('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password; // Will be hashed by pre-save hook
      }
      
      const updatedUser = await user.save();
      
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating profile', error: error.message });
  }
});

// @desc    Get all users (admin only)
// @route   GET /api/auth/users
// @access  Private/Admin
router.get('/users', protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @desc    Forgot password - Generate and send reset token
// @route   POST /api/auth/forgot-password
// @access  Public
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    
    // Find user by email
    const user = await User.findOne({ email });
    
    if (!user) {
      // For security, don't reveal if the email exists or not
      return res.status(200).json({ 
        success: true, 
        message: 'If an account with that email exists, a password reset link has been sent.' 
      });
    }
    
    // Generate reset token
    const { resetToken, resetPasswordToken, resetPasswordExpire } = getResetPasswordToken();
    
    // Save hashed token to database
    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpire = resetPasswordExpire;
    await user.save({ validateBeforeSave: false });
    
    // Create reset URL
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    
    try {
      // Send email with reset link
      await sendResetEmail({
        email: user.email,
        name: user.name,
        resetUrl,
      });
      
      res.status(200).json({ 
        success: true, 
        message: 'Password reset email sent' 
      });
    } catch (error) {
      console.error('Email sending error:', error);
      
      // Clear the reset token if email fails to send
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });
      
      return res.status(500).json({ 
        success: false, 
        message: 'Email could not be sent' 
      });
    }
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error processing forgot password request' 
    });
  }
});

// @desc    Validate reset token
// @route   GET /api/auth/validate-reset-token/:token
// @access  Public
router.get('/validate-reset-token/:token', async (req, res) => {
  try {
    // Hash the token to compare with database
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');
    
    // Find user by token and check expiration
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });
    
    if (!user) {
      return res.status(400).json({ 
        valid: false, 
        message: 'Invalid or expired reset token' 
      });
    }
    
    res.status(200).json({ 
      valid: true, 
      message: 'Valid reset token' 
    });
  } catch (error) {
    console.error('Token validation error:', error);
    res.status(500).json({ 
      valid: false, 
      message: 'Error validating reset token' 
    });
  }
});

// @desc    Reset password with token
// @route   PUT /api/auth/reset-password
// @access  Public
router.put('/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    
    if (!token || !newPassword) {
      return res.status(400).json({ 
        success: false, 
        message: 'Token and new password are required' 
      });
    }
    
    // Hash the token to compare with database
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');
    
    // Find user by token and check expiration
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });
    
    if (!user) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid or expired reset token' 
      });
    }
    
    // Set new password and clear reset token
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    
    // Save user with new password
    await user.save();
    
    // Generate new JWT token
    const authToken = generateToken(user._id, user.role);
    
    res.status(200).json({ 
      success: true, 
      message: 'Password reset successful',
      token: authToken
    });
    
  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error resetting password' 
    });
  }
});

export default router;
