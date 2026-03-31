const addressModel = require("../../models/addressModel")

const deleteAddress = async (req, res) => {
  try {

    await addressModel.findByIdAndDelete(req.body.addressId)

    res.json({
      success: true,
      message: "Address deleted"
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

module.exports = deleteAddress