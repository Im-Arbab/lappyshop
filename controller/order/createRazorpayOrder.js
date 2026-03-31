
// const razorpay = require("../../config/razorpay")
// const cartModel = require("../../models/cartProduct")

// const createRazorpayOrder = async (req, res) => {

//   try {

//     const userId = req.userId

//     const cartItems = await cartModel
//       .find({ userId })
//       .populate("productId")

//     if (!cartItems.length) {
//       return res.json({
//         success: false,
//         message: "Cart is empty"
//       })
//     }

//     const totalAmount = cartItems.reduce(
//       (sum, item) =>
//         sum + item.quantity * item.productId.sellingPrice,
//       0
//     )

//     const options = {
//       amount: totalAmount * 100,
//       currency: "INR",
//       receipt: "receipt_" + Date.now(),
//     }

//     const order = await razorpay.orders.create(options)

//     res.status(200).json({
//       success: true,
//       data: order,
//       amount: totalAmount
//     })

//   } catch (error) {

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     })

//   }

// }

// module.exports = createRazorpayOrder
const razorpay = require("../../config/razorpay")
const cartModel = require("../../models/cartProduct")

const createRazorpayOrder = async (req, res) => {

  try {

    const userId = req.userId

    const cartItems = await cartModel
      .find({ userId })
      .populate("productId")

    if (!cartItems.length) {
      return res.json({
        success: false,
        message: "Cart is empty"
      })
    }

    /* ---------------- FIXED PRICE CALCULATION ---------------- */

    const totalAmount = cartItems.reduce((sum, item) => {

      const price = Number(item.price) || 0   // 🔥 FIX
      const qty = Number(item.quantity) || 1

      return sum + price * qty

    }, 0)

    if (!totalAmount || totalAmount <= 0) {
      return res.json({
        success: false,
        message: "Invalid cart amount"
      })
    }

    /* ---------------- RAZORPAY ORDER ---------------- */

    const options = {
      amount: Math.round(totalAmount * 100), // paise
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    }

    const order = await razorpay.orders.create(options)

    res.status(200).json({
      success: true,
      data: order,
      amount: totalAmount
    })

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    })

  }

}

module.exports = createRazorpayOrder