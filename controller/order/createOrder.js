const orderModel = require("../../models/orderModel")
const addToCartModel = require("../../models/cartProduct")
const addressModel = require("../../models/addressModel")

const createOrder = async (req, res) => {
  try {

    const userId = req.userId
    const { addressId, paymentMethod } = req.body

    // 🔥 1️⃣ Get selected address
    const address = await addressModel.findById(addressId)

    if (!address) {
      return res.json({
        success: false,
        message: "Address not found"
      })
    }

    // 🔥 2️⃣ Get cart items
    const cartItems = await addToCartModel
      .find({ userId })
      .populate("productId")

    if (cartItems.length === 0) {
      return res.json({
        success: false,
        message: "Cart is empty"
      })
    }

    // 🔥 3️⃣ Create order items array
    const items = cartItems.map(item => ({
      productId: item.productId._id,
      quantity: item.quantity,
      price: item.productId.sellingPrice
    }))

    // 🔥 4️⃣ Calculate total
    const totalAmount = items.reduce(
      (prev, curr) => prev + (curr.price * curr.quantity),
      0
    )

    // 🔥 5️⃣ Create order
    const newOrder = new orderModel({
      userId,
      items,
      totalAmount,
      paymentMethod,

      // 📦 ADDRESS SNAPSHOT
      address: {
        fullName: address.fullName,
        phone: address.phone,
        pincode: address.pincode,
        state: address.state,
        city: address.city,
        addressLine: address.addressLine,
        landmark: address.landmark
      },

      paymentStatus: paymentMethod === "cod" ? "pending" : "paid",
      orderStatus: "processing"
    })

    await newOrder.save()

    // 🔥 6️⃣ Clear cart after order
    await addToCartModel.deleteMany({ userId })

    res.json({
      success: true,
      message: "Order placed successfully",
      data: newOrder
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

module.exports = createOrder