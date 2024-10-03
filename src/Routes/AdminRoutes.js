const {
  createAdmin,
  adminLogin,
  createLisnter,
} = require("../Controllers/AdminController");
const auth = require("../Middelware/Auth");
module.exports = (app) => {
  const err = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);
  app.post("/createAdmin", err(createAdmin));
  app.post("/admin/login", err(adminLogin));
  app.post("/admin/createlistner", auth, err(createLisnter));
};
