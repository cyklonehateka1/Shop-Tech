const jwt = require("jsonwebtoken");
const errorHandler = require("./errorHandler.js");

const verifyToken = (req, res, next) => {
  let token = req.headers.authorization;
  console.log(token);

  if (!token) return next(errorHandler(401, "You're not authenticated"));
  if (token.startsWith("Bearer")) {
    token = token.split(" ")[1];
  } else {
    return next(errorHandler(400, "You're not authenticated"));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, "You're not authorized"));
    req.user = user;
    next();
  });
};

module.exports = verifyToken;
