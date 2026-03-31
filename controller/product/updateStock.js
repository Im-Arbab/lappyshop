const productModel = require("../../models/productModel")

const updateStock = async (req, res) => {
  try {
    const { productId, stock } = req.body

    await productModel.findByIdAndUpdate(productId, {
      stock
    })

    res.json({
      success: true,
      message: "Stock updated"
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

module.exports = updateStock