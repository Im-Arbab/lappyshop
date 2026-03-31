
const productModel = require("../../models/productModel")

const uploadProductController = async(req,res)=>{

try{

const product = new productModel(req.body)

await product.save()

res.json({
success:true,
message:"Product uploaded"
})

}catch(err){

res.json({
success:false,
message:err.message
})

}

}

module.exports = uploadProductController