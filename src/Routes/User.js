const { createLisnter } = require("../Controllers/AdminController");
const { findListners } = require("../Controllers/ListenerController");
const {
  LoginWithNumber,
  verifyOTP,
  resendOTP,
} = require("../Controllers/UserController");

module.exports = (app) => {
  const err = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);
  app.post("/login", err(LoginWithNumber));
  app.post("/verify", err(verifyOTP));
  app.post("/resent_otp", err(resendOTP));
  app.post("/create-listner", err(createLisnter));
  app.get("/getlistner", auth, err(findListners));
  // listner

  app.post("/lisnter/login", err(loginListner));
};
