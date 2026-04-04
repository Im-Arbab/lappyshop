const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

module.exports = razorpay;





// const Razorpay = require("razorpay")

// const razorpay = new Razorpay({
//   key_id: process.env.REACT_APP_RAZORPAY_KEY,
//   key_secret: process.env.RAZORPAY_SECRET
// })

// module.exports = razorpay

// REACT_APP_RAZORPAY_KEY=rzp_live_SPrq2OQEHiH2dl
// RAZORPAY_SECRET=az3itFslwtuNwGtpmldXPOnU
// # RAZORPAY_KEY_ID=rzp_test_1a2b3c4d5e
// # RAZORPAY_KEY_SECRET=abcdef1234567890