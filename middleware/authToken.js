
const jwt = require('jsonwebtoken')

async function authToken(req, res, next) {
    try {

        const token = req.cookies?.token

        console.log(" Cookies:", req.cookies);
        console.log("Token:", token);
        

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

        console.log("JWT ERROR:", err.message);
        
        return res.status(401).json({
            message: "Unauthorized",
            success: false,
            error: true
        })
    }
}

module.exports = authToken