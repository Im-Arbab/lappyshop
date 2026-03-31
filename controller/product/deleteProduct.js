const productModel = require("../../models/productModel")

const deleteProduct = async(req,res)=>{

try{

const { productId } = req.body

await productModel.findByIdAndDelete(productId)

res.json({
success:true,
message:"Product deleted"
})

}catch(err){

res.json({
success:false,
message:err.message
})

}

}

module.exports = deleteProduct