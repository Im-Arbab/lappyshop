const addressModel = require("../../models/addressModel")

const getUserAddress = async (req, res) => {
  try {

    const addresses = await addressModel.find({
      userId: req.userId
    }).sort({ isDefault: -1 })

    res.json({
      success: true,
      data: addresses
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

module.exports = getUserAddress