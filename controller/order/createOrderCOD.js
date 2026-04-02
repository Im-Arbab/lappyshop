
const orderModel = require("../../models/orderModel")
const addToCartModel = require("../../models/cartProduct")
const productModel = require("../../models/productModel")

const createOrderCOD = async (req, res) => {

  try {

    const userId = req.userId
    const { addressId, warranty } = req.body

    const cartItems = await addToCartModel
      .find({ userId })
      .populate("productId")

    if (!cartItems.length) {
      return res.status(400).json({
        message: "Cart is empty",
        success: false,
      })
    }

    /* ---------------- STOCK CHECK ---------------- */

    for (let item of cartItems) {

      if (item.quantity > item.productId.stock) {
        return res.status(400).json({
          success: false,
          message: `Only ${item.productId.stock} left for ${item.productId.productName}`
        })
      }

    }

    /* ---------------- PRICE CALCULATION ---------------- */

    let subtotal = 0

    const items = cartItems.map((item) => {

      const price = Number(item.price) || 0   // 🔥 FIX
      const qty = Number(item.quantity) || 1

      subtotal += price * qty

      return {
        productId: item.productId._id,
        quantity: qty,
        price: price,
        ram: item.ram,
        storage: item.storage
      }

    })

    /* ---------------- WARRANTY ---------------- */

    const warrantyCost =
      warranty === "6m"
        ? subtotal * 0.05
        : warranty === "1y"
        ? subtotal * 0.1
        : 0

    const totalAmount = subtotal + warrantyCost

    /* ---------------- SAVE ORDER ---------------- */

    const newOrder = new orderModel({
      userId,
      items,
      shippingAddress: addressId,   // 🔥 FIX
      warranty,
      subtotal,
      warrantyCost,
      totalAmount,
      paymentMethod: "cod",
      paymentStatus: "pending",
    })

    await newOrder.save()

    /* ---------------- REDUCE STOCK ---------------- */

    for (let item of items) {

      await productModel.findByIdAndUpdate(
        item.productId,
        { $inc: { stock: -item.quantity } }
      )

    }

    /* ---------------- CLEAR CART ---------------- */

    await addToCartModel.deleteMany({ userId })

    res.status(200).json({
      success: true,
      message: "Order placed successfully",
    })

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    })

  }

}

module.exports = createOrderCOD