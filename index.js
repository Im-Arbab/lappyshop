require("dotenv").config()
const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const connectDB = require("./config/db")
const path = require("path")
const fs = require("fs")

const uploadRoute = require("./routes/uploadImage")

const app = express()

connectDB()

// ---------- CORS ----------
app.use(cors({
origin: "https://lappyshop.com",
credentials:true
}))

// ---------- Middleware ----------
app.use(express.json())
app.use(cookieParser())

// ---------- Ensure uploads folder exists ----------
const uploadPath = path.join(__dirname,"uploads")

if(!fs.existsSync(uploadPath)){
fs.mkdirSync(uploadPath)
}

// ---------- Serve uploaded images ----------
app.use("/uploads", express.static(uploadPath))

// ---------- Routes ----------
const router = require("./routes")

app.use("/api",router)
app.use("/api",uploadRoute)

// ---------- Test route ----------
app.get("/",(req,res)=>{
res.send("API Running")
})

// ---------- Server ----------
app.listen(process.env.PORT || 8080,()=>{
console.log("🚀 Server running on port",process.env.PORT || 8080)
})
