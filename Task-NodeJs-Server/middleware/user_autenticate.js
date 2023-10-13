const jwt = require("jsonwebtoken");
  const checkToken = (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
      token = token.slice(7);
      jwt.verify(token,'thisismysecrettoken', (err, decoded) => {
        if (err) {
          return res.status(401).json({
            status: 0,
            message: "Invalid Token..."
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.status(401).json({
        status: 0,
        message: "Access Denied! Unauthorized User"
      });
    }
  }
module.exports = checkToken
