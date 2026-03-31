const orderModel = require("../../models/orderModel")

const getSingleOrder = async (req, res) => {

  try {

    const { id } = req.params

    const order = await orderModel
      .findById(id)
      .populate("items.productId")

    res.json({
      success: true,
      data: order
    })

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    })

  }

}

module.exports = getSingleOrder