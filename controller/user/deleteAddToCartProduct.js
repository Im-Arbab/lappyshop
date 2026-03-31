

const addToCartModel = require("../../models/cartProduct")

const deleteAddToCartProduct = async (req, res) => {
    try {

        const currentUserId = req.userId
        const addToCartProductId = req.body._id

        if (!addToCartProductId) {
            return res.status(400).json({
                message: "Cart item ID required",
                success: false,
                error: true
            })
        }

        const deleteProduct = await addToCartModel.deleteOne({
            _id: addToCartProductId,
            userId: currentUserId   // 🔥 USER CHECK
        })

        res.status(200).json({
            message: "Product Deleted From Cart",
            success: true,
            error: false,
            data: deleteProduct
        })

    } catch (err) {
        res.status(500).json({
            message: err?.message || "Server Error",
            success: false,
            error: true
        })
    }
}

module.exports = deleteAddToCartProduct