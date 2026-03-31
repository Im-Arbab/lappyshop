const orderModel = require("../../models/orderModel")
const productModel = require("../../models/productModel")

const cancelOrder = async (req, res) => {
  try {

    const { orderId } = req.body

    const order = await orderModel.findById(orderId)

    if (!order || order.orderStatus !== "processing") {
      return res.json({
        success: false,
        message: "Order cannot be cancelled"
      })
    }

    // 🔥 Restore stock
    for (let item of order.items) {
      await productModel.findByIdAndUpdate(
        item.productId,
        { $inc: { stock: item.quantity } }
      )
    }

    order.orderStatus = "cancelled"
    await order.save()

    res.json({
      success: true,
      message: "Order cancelled"
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

module.exports = cancelOrder