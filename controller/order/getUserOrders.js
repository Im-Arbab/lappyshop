const orderModel = require("../../models/orderModel")

const getUserOrders = async (req, res) => {
  try {
    const userId = req.userId

    const orders = await orderModel
      .find({ userId })
      .populate("items.productId")
      .sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      data: orders,
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

module.exports = getUserOrders