
const orderModel = require("../../models/orderModel")

const updateOrderStatus = async (req, res) => {

  try {

    const { orderId, status } = req.body

    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { orderStatus: status },
      { new: true }
    )

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

module.exports = updateOrderStatus