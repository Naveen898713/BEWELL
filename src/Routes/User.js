
const { findListners, loginListner } = require("../Controllers/ListenerController");
const {
  LoginWithNumber,
  verifyOTP,
  resendOTP,
  finduser,
} = require("../Controllers/UserController");
const auth = require("../Middelware/Auth");
module.exports = (app) => {
  const err = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);
  app.post("/login", err(LoginWithNumber));
  app.post("/verify", err(verifyOTP));
  app.post("/resent_otp", err(resendOTP));
  app.get("/getlistner", auth, err(findListners));
  // listner
  app.get('/getuser',auth, err(finduser))

  app.post("/lisnter/login", err(loginListner));
};
