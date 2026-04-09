const bcrypt = require("bcryptjs");
const userModel = require("../../models/userModel");

const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    const user = await userModel.findOne({
      resetToken: token,
      resetTokenExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.json({
        success: false,
        message: "Invalid or expired token"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;

    await user.save();

    res.json({
      success: true,
      message: "Password updated successfully"
    });

  } catch (err) {
    res.json({
      success: false,
      message: err.message
    });
  }
};

module.exports = resetPassword;