// models/Coupon.js
const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    uppercase: true,
    unique: true,
  },
  discountType: {
    type: String,
    enum: ["flat", "percentage"],
    required: true,
  },
  discountValue: {
    type: Number,
    required: true,
  },
  minCartValue: {
    type: Number,
    default: 0,
  },
  maxDiscount: {
    type: Number, // only for percentage
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  usedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model("Coupon", couponSchema);