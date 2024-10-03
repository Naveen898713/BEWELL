const UserSchema = require("../Models/UserModal");
const { resStatus, resStatusToken } = require("../Responses/Response");
const bcrpyt = require("bcrypt");
const { generateToken } = require("../Services/commonfunction");
module.exports.createAdmin = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  if ((email, password)) {
    const isExisting = await UserSchema.findOne({
      email: email,
      userType: "admin",
    });

    if (isExisting) {
      return resStatus(res, false, "admin already exists!");
    }

    const user = await UserSchema({
      email,
      password,
      firstName,
      lastName,
    });
    await user
      .save()
      .then(() => {
        return resStatus(res, true, "Admin  created successfully");
      })
      .then((error) => {
        console.log(error);
        resStatus(res, false, "error in creating admin");
      });
  } else {
    resStatus(res, false, "email and password required ");
  }
};

module.exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const user = await UserSchema.findOne({ email: email, userType: "admin" });
    if (user) {
      const isMatch = await bcrpyt.compare(password, user.password);
      if (isMatch) {
        const token = await generateToken(user._id);
        resStatusToken(res, true, "login successfully", token);
      } else {
        resStatus(res, false, "invaild credentials");
      }
    } else {
      resStatus(res, false, "invaild credentials");
    }
  } else {
    resStatus(res, false, "email and password required ");
  }
};

module.exports.createLisnter = async (req, res) => {
  const { number, password, firstName, lastName, listnerType } = req.body;
  try {
    if (number && password && listnerType) {
      const isExisting = await UserSchema.findOne({ number });
      if (isExisting) {
        return resStatus(res, false, "listner already regirsted!");
      }
      const user = await UserSchema({
        password,
        number,
        firstName,
        lastName,
        listnerType,
      });

      await user
        .save()
        .then(() => {
          resStatusData(res, true, "listner created successfully", user);
        })
        .then((error) => {
          resStatus(res, false, "error in creating listner");
        });
    } else {
      resStatus(res, false, "email ,password and listnerType required !");
    }
  } catch (error) {
    console.log(error);
  }
};
