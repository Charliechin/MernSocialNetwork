const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = (req, res, next) => {
  // Get Token from Header
  const token = req.header('x-auth-token');
  console.log(`token: ${token}`);

  // Check if not token
  if (!token) {
    // not authorized
    return res
      .status(401).json({ msg: "No token, auth denied" });
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtToken'));

    req.user = decoded.user;
    next();

  } catch (error) {
    res.status(401).json({ msg: "Token is not Valid" });

  }
}