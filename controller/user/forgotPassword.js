const crypto = require("crypto");
const userModel = require("../../models/userModel");
const nodemailer = require("nodemailer");

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User not found"
      });
    }

    // 🔐 TOKEN GENERATE
    const token = crypto.randomBytes(32).toString("hex");

    user.resetToken = token;
    user.resetTokenExpire = Date.now() + 10 * 60 * 1000; // 10 min

    await user.save();

    // 📧 EMAIL SEND
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
      }
    });

    const resetLink = `https://lappyshop.com/reset-password/${token}`;

    await transporter.sendMail({
      to: email,
      subject: "Reset Password",
      html: `<h3>Click below to reset password:</h3>
             <a href="${resetLink}">${resetLink}</a>`
    });

    res.json({
      success: true,
      message: "Reset link sent to email"
    });

  } catch (err) {
    res.json({
      success: false,
      message: err.message
    });
  }
};

module.exports = forgotPassword;