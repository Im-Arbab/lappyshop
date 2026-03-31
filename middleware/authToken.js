
const jwt = require('jsonwebtoken')

async function authToken(req, res, next) {
    try {

        const token = req.cookies?.token

        if (!token) {
            return res.status(401).json({
                message: "Please login",
                success: false,
                error: true
            })
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        )

        if (!decoded) {
            return res.status(401).json({
                message: "Invalid token",
                success: false,
                error: true
            })
        }

        // 🔥 Attach full user info to request
        req.userId = decoded._id
        req.userRole = decoded.role

        next()

    } catch (err) {
        return res.status(401).json({
            message: "Unauthorized",
            success: false,
            error: true
        })
    }
}

module.exports = authToken