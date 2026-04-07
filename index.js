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

app.set("trust proxy", 1);
// ---------- CORS ----------

const allowedOrigins = [
    "https://lappyshop.com",
    "https://www.lappyshop.com",
    "http://localhost:3000"
]
app.use(cors({
// origin: process.env.FRONTEND_URL || "http://localhost:3000",
origin : function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
        callback(null, true);
    } else {
        callback(new Error("CORS not allowed: " + origin));
    }
},
credentials:true,
methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
allowedHeaders: ["Content-Type", "Authorization"],
}));

app.options("*", cors());

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
const PORT = process.env.PORT
// ---------- Server ----------
app.listen(process.env.PORT || 8080,()=>{
console.log("🚀 Server running on port",PORT)
})