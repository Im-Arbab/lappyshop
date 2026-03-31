

const addToCartModel = require("../../models/cartProduct")

const updateAddToCartProduct = async (req, res) => {
    try {

        const currentUserId = req.userId
        const addToCartProductId = req.body._id
        const qty = req.body.quantity

        if (!addToCartProductId) {
            return res.status(400).json({
                message: "Cart item ID required",
                success: false,
                error: true
            })
        }

        if (qty < 1) {
            return res.status(400).json({
                message: "Quantity must be at least 1",
                success: false,
                error: true
            })
        }

        const updateProduct = await addToCartModel.updateOne(
            { _id: addToCartProductId, userId: currentUserId }, // 🔥 USER CHECK
            { quantity: qty }
        )

        res.status(200).json({
            message: "Product Updated",
            data: updateProduct,
            success: true,
            error: false
        })

    } catch (err) {
        res.status(500).json({
            message: err?.message || "Server Error",
            success: false,
            error: true
        })
    }
}

module.exports = updateAddToCartProduct