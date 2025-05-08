const jwt = require('jsonwebtoken');

// Middleware to authenticate JWT
const authenticateJWT = (req, res, next) => {
    // Extract token from the Authorization header
    const token = req.header("Authorization")?.split(" ")[1];  // Token is expected to be in the format "Bearer <token>"

    // If there's no token, deny access
    if (!token) return res.status(403).json({ message: "Access denied" });

    // Verify the token using the JWT secret
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        // If the token is invalid or expired
        if (err) return res.status(403).json({ message: "Token is not valid" });

        // Attach the user data (decoded from token) to the request object
        req.user = user;

        // Proceed to the next middleware or route handler
        next();
    });
};

module.exports = { authenticateJWT };
