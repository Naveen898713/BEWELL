const jwt = require("jsonwebtoken");
const User = require("../Models/UserModal");

const verifyToken = async (req, res, next) => {
  const authorization = req.headers["authorization"];
  if (!authorization) {
    return res.status(401).send({status:false,message:"A token is required for authentication"});
  }
  try {
    const decoded = await jwt.verify(authorization, process.env.TOKEN_KEY);
    const user = await User.findOne({ _id: decoded.user });
    if (!user) {
      return res.status(401).send("User not found 2");
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).send(err.message);
  }
};

module.exports = verifyToken;
