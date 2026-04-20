// routes/coupon.js
const express = require("express");
const router = express.Router();
const Coupon = require("../models/coupon");

router.post("/apply", async (req, res) => {
  try {
    const { code, cartTotal, userId } = req.body;

    const coupon = await Coupon.findOne({ code: code.toUpperCase() });

    if (!coupon) {
      return res.status(400).json({ message: "Invalid coupon" });
    }

    if (!coupon.isActive) {
      return res.status(400).json({ message: "Coupon inactive" });
    }

    if (new Date() > coupon.expiryDate) {
      return res.status(400).json({ message: "Coupon expired" });
    }

    if (cartTotal < coupon.minCartValue) {
      return res.status(400).json({
        message: `Minimum order ₹${coupon.minCartValue} required`,
      });
    }

    if (coupon.usedBy.includes(userId)) {
      return res.status(400).json({ message: "Already used" });
    }

    let discount = 0;

    if (coupon.discountType === "flat") {
      discount = coupon.discountValue;
    } else {
      discount = (cartTotal * coupon.discountValue) / 100;

      if (coupon.maxDiscount) {
        discount = Math.min(discount, coupon.maxDiscount);
      }
    }

    res.json({
      success: true,
      discount,
      finalAmount: cartTotal - discount,
      coupon: coupon.code,
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;