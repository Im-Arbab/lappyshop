
const orderModel = require("../../models/orderModel")

const getAllOrders = async (req, res) => {

  try {

    const orders = await orderModel
      .find()
      .populate("userId")
      .populate("items.productId")
      .sort({ createdAt: -1 })

    res.json({
      success: true,
      data: orders
    })

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    })

  }

}

module.exports = getAllOrders