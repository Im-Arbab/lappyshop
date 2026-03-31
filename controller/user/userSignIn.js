
const bcrypt = require('bcryptjs')
const userModel = require('../../models/userModel')
const jwt = require('jsonwebtoken')

async function userSignInController(req, res) {
    try {
        const { email, password } = req.body

        if (!email) {
            return res.status(400).json({
                message: "Please provide email",
                error: true,
                success: false
            })
        }

        if (!password) {
            return res.status(400).json({
                message: "Please provide password",
                error: true,
                success: false
            })
        }

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false
            })
        }

        const checkPassword = await bcrypt.compare(password, user.password)

        if (!checkPassword) {
            return res.status(401).json({
                message: "Invalid password",
                error: true,
                success: false
            })
        }

        // 🔥 Include role in JWT
        const tokenData = {
            _id: user._id,
            email: user.email,
            role: user.role
        }

        const token = jwt.sign(
            tokenData,
            process.env.JWT_SECRET,
            { expiresIn: "8h" }
        )

        const tokenOption = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // dev safe
            sameSite: "strict"
        }

        res.cookie("token", token, tokenOption).status(200).json({
            message: "Login successfully",
            success: true,
            error: false,
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                profilePic: user.profilePic
            }
        })

    } catch (err) {
        res.status(500).json({
            message: err.message || "Server Error",
            error: true,
            success: false
        })
    }
}

module.exports = userSignInController