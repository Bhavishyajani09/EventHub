const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Organizer = require('../models/Organizer');
const Admin = require('../models/Admin');

/**
 * JWT Authentication Middleware
 * Protects routes by verifying JWT tokens and attaching user info to request
 */
const authMiddleware = async (req, res, next) => {
  try {
    // Get token from Authorization header (Bearer token format)
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false, 
        message: 'Access denied. No valid token provided.' 
      });
    }

    // Extract token (remove 'Bearer ' prefix)
    const token = authHeader.substring(7);

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Try to find user in different models
    let user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      user = await Organizer.findById(decoded.id).select('-password');
    }
    
    if (!user) {
      user = await Admin.findById(decoded.id).select('-password');
    }
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Token is valid but user not found.' 
      });
    }

    // Attach user info to request object for use in protected routes
    req.user = user;
    next();
    
  } catch (error) {
    // Handle different JWT errors
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid token.' 
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false, 
        message: 'Token has expired.' 
      });
    }

    console.error('Auth middleware error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during authentication.' 
    });
  }
};

module.exports = authMiddleware;