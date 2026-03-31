
const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema(
{
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
      quantity: Number,
      price: Number,
    },
  ],

  // shipping snapshot
  shippingAddress: {
    fullName: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    pincode: String,
  },

  // optional extra address structure
  address: {
    fullName: String,
    phone: String,
    pincode: String,
    state: String,
    city: String,
    addressLine: String,
    landmark: String
  },

  // warranty option
  warranty: {
    type: String,
    enum: ["none", "6m", "1y"],
    default: "none",
  },

  subtotal: Number,

  warrantyCost: {
    type: Number,
    default: 0
  },

  totalAmount: Number,

  paymentMethod: {
    type: String,
    enum: ["cod", "razorpay"],
    // default: "cod",
    required: true
  },

  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending",
  },

  orderStatus: {
    type: String,
    enum: [
      "processing",
      "shipped",
      "out_for_delivery",
      "delivered",
      "cancelled"
    ],
    default: "processing",
  },

},
{ timestamps: true }
)

module.exports = mongoose.model("order", orderSchema)