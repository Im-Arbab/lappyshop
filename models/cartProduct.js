
const mongoose = require("mongoose")

const addToCart = mongoose.Schema({

productId:{
type:mongoose.Schema.Types.ObjectId,
ref:"product"
},

ram:{
type:String
},

storage:{
type:String
},

price:{
type:Number
},

quantity:{
type:Number,
default:1
},

userId:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
}

},{
timestamps:true
})

const addToCartModel = mongoose.model("addToCart",addToCart)

module.exports = addToCartModel