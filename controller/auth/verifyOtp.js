// controller/auth/verifyOtp.js
const OTP = require("../../models/otpModel");
const userModel = require("../../models/userModel");
const jwt = require("jsonwebtoken");

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  const record = await OTP.findOne({ email });

  if (!record || record.otp !== otp) {
    return res.json({
      success: false,
      message: "Invalid OTP"
    });
  }

  if (record.expiresAt < new Date()) {
    return res.json({
      success: false,
      message: "OTP expired"
    });
  }

  const user = await userModel.findOne({ email });

  const token = jwt.sign(
    { _id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none"
  });

  res.json({
    success: true,
    message: "Login success",
    data: user
  });
};

module.exports = verifyOtp;