const productModel = require("../../models/productModel")

const getProductDetails = async(req,res)=>{
    try{
        const { productId } = req.body

        const product = await productModel.findById(productId)

        res.json({
            data : product,
            message : "Ok",
            success : true,
            error : false
        })

        
    }catch(err){
        res.json({
            message : err?.message  || err,
            error : true,
            success : false
        })
    }
}

module.exports = getProductDetails
// const productModel = require("../../models/productModel");

// const getProductDetails = async (req, res) => {
//   try {
//     const { productId } = req.body;

//     const product = await productModel.findById(productId);

//     if (!product) {
//       return res.json({
//         message: "Product not found",
//         success: false,
//         error: true,
//       });
//     }

//     // 🔥 CLEAN + SAFE DATA
//     const formattedProduct = {
//       _id: product._id,
//       productName: product.productName || "",
//       description: product.description || "",
//       price: Number(product.price) || 0,

//       images: product.productImage || [],

//       // 🔥 VARIANTS CREATE (RAM + STORAGE COMBO)
//       variants:
//         product.ramOptions?.map((ram, i) => ({
//           ram,
//           storage: product.storageOptions?.[i] || "",
//           price: Number(product.price) || 0,
//         })) || [],

//       specifications: product.specifications || {},
//     };

//     res.json({
//       data: formattedProduct,
//       success: true,
//       error: false,
//     });
//   } catch (err) {
//     res.json({
//       message: err?.message || err,
//       error: true,
//       success: false,
//     });
//   }
// };

// module.exports = getProductDetails;