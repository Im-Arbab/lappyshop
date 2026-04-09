// controller/auth/sendOtp.js
const OTP = require("../../models/otpModel");
const userModel = require("../../models/userModel");
const nodemailer = require("nodemailer");

const sendOtp = async (req, res) => {
  const { email } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.json({
      success: false,
      message: "User not found"
    });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  await OTP.create({
    email,
    otp,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000)
  });

  // 📧 EMAIL SEND
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    to: email,
    subject: "OTP Login",
    html: `<h2>Your OTP: ${otp}</h2>`
  });

  res.json({
    success: true,
    message: "OTP sent to email"
  });
};

module.exports = sendOtp;