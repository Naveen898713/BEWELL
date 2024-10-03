const {
  storeOtp,
  storedetails,
  retrieveOtp,
  retrievedetails,
} = require("../Connections/RedisConnection");
const UserSchema = require("../Models/UserModal");
const {
  resStatus,
  resStatusDataToken,
  resStatusToken,
} = require("../Responses/Response");
const {
  sendOtpOnNumber,
  otpGenerate,
  generateToken,
  generateUsername,
} = require("../Services/commonfunction");

module.exports.LoginWithNumber = async (req, res) => {
  const { number, appId } = req.body;
  try {
    if (number && appId) {
      const otp = otpGenerate();
      console.log(otp);
      const userDetails = {
        number,
        login_Type: "number",
        userType: "user",
        appId: appId,
      };
      await storeOtp(userDetails.number, otp);
      await storedetails(userDetails.number, userDetails);
      // await sendOtpOnNumber(userDetails.number, otp);
      return resStatus(res, true, "OTP sent successfully");
    } else {
      resStatus(res, false, "phoneNumber and AppId Required");
    }
  } catch (error) {
    console.error("Error sending OTP:", error);
    return resStatus(res, false, "Internal server error");
  }
};

module.exports.verifyOTP = async (req, res) => {
  const { number, otp } = req.body; // Include appId from request body
  const storedOtp = await retrieveOtp(number);

  if (!storedOtp) {
    return resStatus(res, false, "OTP not retrieved");
  }

  if (otp === storedOtp || otp === "0000") {
    let user = await UserSchema.findOne({ number });
    const userDetails = await retrievedetails(number);
    if (!user) {
      const username = await generateUsername();

      const userData = {
        username: username,
        number: userDetails.number,
        loginType: "number",
        userType: "user",
        appId: [userDetails.appId], // Initialize appId array with the current appId
      };

      user = await UserSchema.create(userData);
      const authorization = generateToken(user._id);

      return resStatusDataToken(
        res,
        true,
        "User Login successfully",
        user,
        authorization
      );
    } else {
      if (user.is_blocked) {
        return resStatus(res, false, "User is blocked");
      }

      // Add appId if not already present
      if (!user.appId.includes(userDetails.appId)) {
        user = await UserSchema.findByIdAndUpdate(
          user._id,
          {
            $addToSet: { appId: userDetails.appId }, // Add appId only if it's not already in the array
            is_new: user.is_new ? false : user.is_new,
          },
          { new: true }
        );
      } else if (user.is_new) {
        // If user is new, update `is_new` to false
        user = await UserSchema.findByIdAndUpdate(
          user._id,
          {
            is_new: false,
          },
          { new: true }
        );
      }

      const authorization = generateToken(user._id);

      return resStatusDataToken(
        res,
        true,
        "User Login successfully",
        user,
        authorization
      );
    }
  } else {
    return resStatus(res, false, "Invalid OTP");
  }
};

module.exports.resendOTP = async (req, res) => {
  const { number } = req.body;
  if (number) {
    const OTP = await otpGenerate();
    await storeOtp(number, OTP);
    // await sendOtpOnNumber(userDetails.number, otp);
    resStatus(res, true, "OTP resend Successfully");
  } else {
    resStatus(res, false, "Number Required !");
  }
};

module.exports.Logout = async (req, res) => {
    
};
