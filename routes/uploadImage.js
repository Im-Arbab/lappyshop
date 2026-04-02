const express = require("express")
const router = express.Router()
const upload = require("../config/multer")

router.post("/upload-image", upload.single("image"), (req,res)=>{

try{

res.json({
success:true,
<<<<<<< HEAD
// url:`http://localhost:8080/uploads/${req.file.filename}`
=======
>>>>>>> d83c4a18126415be5be21b2cf2c52ddf67e35a74
url:`${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
})

}catch(err){

res.json({
success:false,
message:err.message
})

}

})

module.exports = router
