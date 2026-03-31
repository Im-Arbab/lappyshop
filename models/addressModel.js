const mongoose = require("mongoose")

const addressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  fullName: String,
  phone: String,
  pincode: String,
  state: String,
  city: String,
  addressLine: String,
  landmark: String,
  isDefault: {
    type: Boolean,
    default: false
  }
}, { timestamps: true })

module.exports = mongoose.model("address", addressSchema)