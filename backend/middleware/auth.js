const jwt = require('jsonwebtoken');
const Organizer = require('../models/Organizer');

/**
 * JWT Authentication Middleware
 * Protects routes by verifying JWT tokens and attaching organizer info to request
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
    
    // Find organizer by ID from token payload
    const organizer = await Organizer.findById(decoded.id).select('-password');
    
    if (!organizer) {
      return res.status(401).json({ 
        success: false, 
        message: 'Token is valid but organizer not found.' 
      });
    }

    // Attach organizer info to request object for use in protected routes
    req.organizer = organizer;
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

    res.status(500).json({ 
      success: false, 
      message: 'Server error during authentication.' 
    });
  }
};

module.exports = authMiddleware;