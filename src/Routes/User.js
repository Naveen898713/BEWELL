const { createLisnter } = require("../Controllers/ListenerController");
const {
  LoginWithNumber,
  verifyOTP,
  resendOTP,
} = require("../Controllers/UserController");

module.exports = (app) => {
  const err = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);
  app.post("/login", LoginWithNumber);
  app.post("/verify", verifyOTP);
  app.post("/resent_otp", resendOTP);
  app.post("/create-listner", createLisnter);
};
