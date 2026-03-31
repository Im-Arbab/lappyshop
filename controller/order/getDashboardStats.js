const orderModel = require("../../models/orderModel")
const userModel = require("../../models/userModel")
const productModel = require("../../models/productModel")

const getDashboardStats = async (req,res)=>{
  try{

    const totalOrders = await orderModel.countDocuments()

    const totalUsers = await userModel.countDocuments()

    const totalProducts = await productModel.countDocuments()

    const revenueData = await orderModel.aggregate([
      {
        $match: { paymentStatus: "paid" }
      },
      {
        $group: {
          _id: null,
          revenue: { $sum: "$totalAmount" }
        }
      }
    ])

    const totalRevenue = revenueData[0]?.revenue || 0

    const recentOrders = await orderModel
      .find()
      .populate("userId")
      .sort({ createdAt: -1 })
      .limit(5)

    res.json({
      success: true,
      data: {
        totalOrders,
        totalUsers,
        totalProducts,
        totalRevenue,
        recentOrders
      }
    })

  }catch(error){
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
}

module.exports = getDashboardStats