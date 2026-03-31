

const userModel = require("../../models/userModel")

async function userDetailsController(req, res) {
    try {

        if (!req.userId) {
            return res.status(401).json({
                message: "Unauthorized",
                success: false,
                error: true
            })
        }

        const user = await userModel.findById(req.userId).select("-password")

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
                error: true
            })
        }

        res.status(200).json({
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                profilePic: user.profilePic,
                createdAt: user.createdAt
            },
            success: true,
            error: false,
            message: "User details fetched successfully"
        })

    } catch (err) {
        res.status(500).json({
            message: err.message || "Server Error",
            success: false,
            error: true
        })
    }
}

module.exports = userDetailsController