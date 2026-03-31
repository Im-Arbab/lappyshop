
// const addToCartModel = require("../../models/cartProduct")

// const addToCartViewProduct = async (req, res) => {
//     try {
//         const currentUser = req.userId

//         if (!currentUser) {
//             return res.status(401).json({
//                 message: "Unauthorized",
//                 success: false,
//                 error: true
//             })
//         }

//         const allProduct = await addToCartModel
//             .find({ userId: currentUser })
//             .populate({
//                 path: "productId",
//                 select: "productName productImage sellingPrice price category"
//             })

//         // 🔥 Calculate subtotal
//         let subtotal = 0

//         allProduct.forEach(item => {
//             // subtotal += item.quantity * item.productId.sellingPrice
//             subtotal += item.quantity * item.price
//         })

//         res.status(200).json({
//             data: allProduct,
//             subtotal: subtotal,
//             success: true,
//             error: false
//         })

//     } catch (err) {
//         res.status(500).json({
//             message: err.message || "Server Error",
//             success: false,
//             error: true
//         })
//     }
// }

// module.exports = addToCartViewProduct
const addToCartModel = require("../../models/cartProduct")

const addToCartViewProduct = async (req,res)=>{

try{

const currentUser = req.userId

const allProduct = await addToCartModel
.find({userId:currentUser})
.populate("productId")

let subtotal = 0

allProduct.forEach(item=>{
subtotal += item.quantity * item.price
})

res.json({
data:allProduct,
subtotal,
success:true
})

}catch(err){

res.status(500).json({
message:err.message,
success:false
})

}

}

module.exports = addToCartViewProduct