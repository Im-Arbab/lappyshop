// const addToCartModel = require("../../models/cartProduct")
// const productModel = require("../../models/productModel")

// const addToCartController = async (req,res)=>{

// try{

// const {productId,ram,storage,price} = req.body
// const currentUser = req.userId

// const isProductAvailable = await addToCartModel.findOne({
// productId,
// ram,
// storage,
// userId:currentUser
// })

// if(isProductAvailable){

// isProductAvailable.quantity += 1
// await isProductAvailable.save()

// return res.json({
// message:"Quantity Updated",
// success:true
// })

// }

// const product = await productModel.findById(productId)

// if(!product){
// return res.json({
// message:"Product not found",
// success:false
// })
// }

// const payload = new addToCartModel({
// productId,
// ram,
// storage,
// price,
// quantity:1,
// userId:currentUser
// })

// await payload.save()

// res.json({
// message:"Product Added to Cart",
// success:true
// })

// }catch(err){

// res.status(500).json({
// message:err.message,
// success:false
// })

// }

// }

// module.exports = addToCartController
const addToCartModel = require("../../models/cartProduct")

const addToCartController = async (req,res)=>{

try{

const {productId,ram,storage,price} = req.body
const currentUser = req.userId

const isProductAvailable = await addToCartModel.findOne({
productId,
ram,
storage,
userId:currentUser
})

if(isProductAvailable){

isProductAvailable.quantity += 1
await isProductAvailable.save()

return res.json({
message:"Quantity Updated",
success:true
})

}

const payload = new addToCartModel({
productId,
ram,
storage,
price,
quantity:1,
userId:currentUser
})

await payload.save()

res.json({
message:"Product Added to Cart",
success:true
})

}catch(err){

res.status(500).json({
message:err.message,
success:false
})

}

}

module.exports = addToCartController