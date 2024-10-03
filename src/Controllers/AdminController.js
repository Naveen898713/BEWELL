const UserSchema = require("../Models/UserModal");
const { resStatus } = require("../Responses/Response");

module.exports.createLisnter = async (req, res) => {
  const { number, password, firstName, lastName } = req.body;
  try {
    const isExisting = await UserSchema.findOne({ number });
    if (isExisting) {
      return resStatus(res, false, "listner already regirsted!");
    }
    const user = await UserSchema({
        password,
        number,
        firstName,
        lastName,
    })
  } catch (error) {}
};
