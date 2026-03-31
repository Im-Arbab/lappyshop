const express = require("express")
const router = express.Router()
const upload = require("../config/multer")

router.post("/upload-image", upload.single("image"), (req,res)=>{

try{

res.json({
success:true,
url:`http://localhost:8080/uploads/${req.file.filename}`
})

}catch(err){

res.json({
success:false,
message:err.message
})

}

})

module.exports = router