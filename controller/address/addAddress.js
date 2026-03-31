const addressModel = require("../../models/addressModel")

const addAddress = async (req, res) => {
  try {

    const userId = req.userId

    const newAddress = new addressModel({
      ...req.body,
      userId
    })

    await newAddress.save()

    res.json({
      success: true,
      message: "Address added successfully"
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

module.exports = addAddress