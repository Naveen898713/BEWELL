const mongoose = require("mongoose");
const bcrpyt = require("bcrypt");
const UserSchema = mongoose.Schema({
  username: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  number: {
    type: String,
  },
  avatar: {
    type: String,
  },
  balance: {
    type: Number,
    default: 0,
  },
  loginType: {
    type: String,
    enum: ["number", "google"],
  },
  userType: {
    type: String,
    enum: ["user", "listner", "admin"],
  },
  listnerType: {
    type: String,
    enum: ["therepist", "phycologist"],
  },
  is_new: {
    type: Boolean,
    default: true,
  },
  is_blocked: {
    type: Boolean,
    default: false,
  },
  appId: [
    {
      type: String,
    },
  ],
});

UserSchema.pre("save", function (next) {
  var user = this;
  if (!user.isModified("password")) return next();
  bcrpyt.genSalt(10, function (err, salt) {
    if (err) return next(err);
    bcrpyt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model("user", UserSchema);
