// const productModel = require("../../models/productModel")

// const filterProductController = async(req,res)=>{
//  try{
//         const categoryList = req?.body?.category || []

//         const product = await productModel.find({
//             category :  {
//                 "$in" : categoryList
//             }
//         })

//         res.json({
//             data : product,
//             message : "product",
//             error : false,
//             success : true
//         })
//  }catch(err){
//     res.json({
//         message : err.message || err,
//         error : true,
//         success : false
//     })
//  }
// }


// module.exports = filterProductController
const productModel = require("../../models/productModel");

const filterProduct = async (req, res) => {
  try {

    const { category, brand, ram, processor } = req.body;

    let filter = {};

    /* CATEGORY */
    if (category) {
      filter.category = category;
    }

    /* BRAND */
    if (brand) {
      filter.brand = new RegExp(`^${brand}$`, "i"); // case insensitive
    }

    /* RAM FILTER (variants) */
    if (ram) {
      filter["variants.ram"] = new RegExp(`^${ram}$`, "i");
    }

    /* PROCESSOR FILTER (specifications) */
    if (processor) {
      filter["specifications.performance.processor"] =
        new RegExp(processor, "i");
    }

    const products = await productModel.find(filter);

    res.json({
      success: true,
      data: products,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = filterProduct;