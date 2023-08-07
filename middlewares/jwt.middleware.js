const { expressjwt } = require('express-jwt');

// Instantiate the JWT token validation middleware
const isAuthenticated = expressjwt({
  secret: process.env.TOKEN_SECRET,
  algorithms: ['HS256'],
  requestProperty: 'payload',
  getToken: getTokenFromHeaders,
});

// Function used to extracts the JWT token from the request's 'Authorization' Headers
function getTokenFromHeaders(req) {
  // Check if the token is available on the request Headers
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    // Get the encoded token string and return it
    const token = req.headers.authorization.split(' ')[1];
    return token;
  }
  return null;
}

// Middleware to extract user ID from the payload and attach it to req.userId
function extractUserId(req, res, next) {
  if (req.payload && req.payload._id) {
    req.userId = req.payload._id;
  }
  next();
}

// Export the middleware so that we can use it to create protected routes
module.exports = {
  isAuthenticated,
  extractUserId,
};
