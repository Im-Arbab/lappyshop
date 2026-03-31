// const crypto = require("crypto")
// const orderModel = require("../../models/orderModel")
// const addToCartModel = require("../../models/cartProduct")
// const productModel = require("../../models/productModel")

// const verifyPayment = async (req, res) => {
//   try {

//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//       orderData
//     } = req.body

//     // 🔐 Verify Razorpay Signature
//     const body = razorpay_order_id + "|" + razorpay_payment_id

//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_SECRET)
//       .update(body)
//       .digest("hex")

//     if (expectedSignature !== razorpay_signature) {
//       return res.status(400).json({
//         success: false,
//         message: "Payment verification failed"
//       })
//     }

//     // 🔥 STEP-4: STOCK CHECK BEFORE SAVING ORDER
//     for (let item of orderData.items) {

//       const product = await productModel.findById(item.productId)

//       if (!product) {
//         return res.status(400).json({
//           success: false,
//           message: "Product not found"
//         })
//       }

//       if (item.quantity > product.stock) {
//         return res.status(400).json({
//           success: false,
//           message: `Only ${product.stock} left for ${product.productName}`
//         })
//       }
//     }

//     // ✅ Create Order
//     const newOrder = new orderModel({
//       userId: orderData.userId,
//       items: orderData.items,
//       shippingAddress: orderData.shippingAddress,
//       warranty: orderData.warranty,
//       subtotal: orderData.subtotal,
//       warrantyCost: orderData.warrantyCost,
//       totalAmount: orderData.totalAmount,
//       paymentStatus: "paid",
//       paymentMethod: "Razorpay"
//     })

//     await newOrder.save()

//     // 🔥 STEP-3: REDUCE STOCK AFTER SUCCESSFUL ORDER
//     for (let item of orderData.items) {
//       await productModel.findByIdAndUpdate(
//         item.productId,
//         { $inc: { stock: -item.quantity } }
//       )
//     }

//     // 🧹 Clear Cart
//     await addToCartModel.deleteMany({ userId: orderData.userId })

//     res.status(200).json({
//       success: true,
//       message: "Payment verified & order created"
//     })

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     })
//   }
// }

// module.exports = verifyPayment
const crypto = require("crypto")
const orderModel = require("../../models/orderModel")
const cartModel = require("../../models/cartProduct")
const productModel = require("../../models/productModel")

const verifyPayment = async (req,res) => {

try{

const {
razorpay_order_id,
razorpay_payment_id,
razorpay_signature
} = req.body

const userId = req.userId

// verify signature
const body = razorpay_order_id + "|" + razorpay_payment_id

const expectedSignature = crypto
.createHmac("sha256",process.env.RAZORPAY_SECRET)
.update(body)
.digest("hex")

if(expectedSignature !== razorpay_signature){

return res.status(400).json({
success:false,
message:"Payment verification failed"
})

}

// get cart items
const cartItems = await cartModel
.find({userId})
.populate("productId")

if(!cartItems.length){

return res.status(400).json({
success:false,
message:"Cart empty"
})

}

// stock check
for(const item of cartItems){

if(item.quantity > item.productId.stock){

return res.status(400).json({
success:false,
message:`Only ${item.productId.stock} left for ${item.productId.productName}`
})

}

}

// create order items
let subtotal = 0

const items = cartItems.map(item=>{

subtotal += item.quantity * item.productId.sellingPrice

return{

productId:item.productId._id,
quantity:item.quantity,
price:item.productId.sellingPrice

}

})

const newOrder = new orderModel({

userId,
items,
subtotal,
totalAmount:subtotal,
paymentMethod:"razorpay",
paymentStatus:"paid"

})

await newOrder.save()

// reduce stock
for(const item of items){

await productModel.findByIdAndUpdate(
item.productId,
{$inc:{stock:-item.quantity}}
)

}

// clear cart
await cartModel.deleteMany({userId})

res.json({
success:true,
message:"Payment success & order placed"
})

}catch(err){

res.status(500).json({
success:false,
message:err.message
})

}

}

module.exports = verifyPayment