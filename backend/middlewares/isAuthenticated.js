import jwt from 'jsonwebtoken';

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token; // Get token from cookies
    if (!token) {
      return res.status(401).json({
        message: 'User not authenticated!',
        success: false,
      });
    }
    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.id = decoded.userId; // Store user ID in the request object
    next(); // Proceed to the next middleware or route
  } catch (error) {
    console.error("Authentication error:", error); // Log the error

    // Handle specific errors for better user feedback
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        message: 'Invalid token!',
        success: false,
      });
    } else if (error.name === 'TokenExpiredError') {
      return res.status(403).json({
        message: 'Token expired!',
        success: false,
      });
    }

    return res.status(500).json({
      message: 'An error occurred during authentication.',
      success: false,
      error: error.message,
    });
  }
};

export default isAuthenticated;
