const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authenticatedUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        err: "You must be logged in",
      });
    }
    const token = authHeader.split(" ")[1]; // This is the bearer token
    const decoded = jwt.verify(token, process.env.SECRET);
    console.log(decoded)
    const user = await User.find({id : decoded.user.id})
    if (!user[0]) {
      return res.status(404).json({ err: "User not found" });
    }
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    res.status(503).json({
      err: "Token is not valid",
    });
  }
};

module.exports = authenticatedUser;