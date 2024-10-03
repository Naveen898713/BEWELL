const mongoose = require("mongoose");
require("dotenv").config();
exports.mongodbConnection = () => {
  mongoose
    .connect(process.env.Database_URL)
    .then(() => {
      console.log("Mongodb connection successfully");
    })
    .catch((err) => {
      console.log("connection fail" + err);
      mongodbConnection();
    });
};
