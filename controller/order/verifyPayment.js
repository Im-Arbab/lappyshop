const crypto = require("crypto");
const orderModel = require("../../models/orderModel");
const cartModel = require("../../models/cartProduct");

const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.json({ success: false, message: "Payment verification failed" });
    }

    const userId = req.userId;

    const cartItems = await cartModel.find({ userId }).populate("productId");

    const items = cartItems.map(item => ({
      productId: item.productId._id,
      quantity: item.quantity,
      price: item.price
    }));

    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // ✅ SAVE ORDER
    const newOrder = new orderModel({
      userId,
      items,
      totalAmount,
      paymentMethod: "razorpay",
      paymentStatus: "paid",
    });

    await newOrder.save();

    // ✅ CLEAR CART
    await cartModel.deleteMany({ userId });

    res.json({ success: true });

  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

module.exports = verifyPayment;