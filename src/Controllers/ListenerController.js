const UserSchema = require("../Models/UserModal");
const {
  resStatus,
  resStatusDataToken,
  resStatusData,
} = require("../Responses/Response");
const bcryt = require("bcrypt");
const { generateToken } = require("../Services/commonfunction");
module.exports.loginListner = async (req, res) => {
  const { number, password } = req.body;
  if (number && password) {
    const user = await UserSchema.findOne({number});
    if (user) {
      const isMatch = await bcryt.compare(password, user.password);
      if (isMatch) {
        const token = await generateToken(user._id);
        resStatusDataToken(
          res,
          true,
          "lisnter Login successfully",
          user,
          token
        );
      } else {
        resStatus(res, false, "invalid credentials");
      }
    } else {
      resStatus(res, false, "invalid credentials");
    }
  } else {
    resStatus(res, false, "Number and password required !");
  }
};

module.exports.findListners = async (req, res) => {
  try {
    const { listnerType } = req.params;
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Find listeners based on the listener type with pagination
    const listeners = await UserSchema.find({ listnerType })
      .skip(skip)
      .limit(limit);

    // Get the total count of listeners
    const totalListeners = await UserSchema.countDocuments({ listnerType });

    // Send paginated response
    const data = {
      listners: listeners,
      currentPage: page,
      totalPages: Math.ceil(totalListeners / limit),
      totalItems: totalListeners,
    };
    return resStatusData(res, true, "listners", data);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};
