const orderModel = require("../../models/orderModel")
const productModel = require("../../models/productModel")

const getAdminStats = async (req, res) => {
  try {

    const totalOrders = await orderModel.countDocuments()

    const orders = await orderModel.find()

    const totalRevenue = orders.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    )

    const totalProducts = await productModel.countDocuments()

    const lowStock = await productModel.countDocuments({
      stock: { $lt: 5 }
    })

    res.json({
      success: true,
      data: {
        totalOrders,
        totalRevenue,
        totalProducts,
        lowStock
      }
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

module.exports = getAdminStats