
const mongoose = require("mongoose")

const variantSchema = new mongoose.Schema({

ram:String,
storage:String,
price:Number,
stock:Number,
processor: String

})

const productSchema = new mongoose.Schema({

productName:String,
brand:String,
category:String,

description:String,

productImage:[String],

condition:{
type:String,
enum:["Fair","Good","Superb"],
default:"Good"
},

warranty:String,

ramOptions:[String],
storageOptions:[String],

variants:[variantSchema],

specifications:{

performance:{

os:String,
windows:String,
bios:String,    
ramType:String,
ramFrequency:String,
ramSize:String,
ramSlots:String,
storageInterface:String,
storagelenth:String,
processor:String,
gpu:String
},

connectivity:{
bluetooth:String,
adapterType:String,
wifi:String,
hdmi:String,
usb:String,
audioJack:String,
typeC:String,

},

display:{
displaySize:String,
displayTech:String,
displayBracket:String,
resolution:String,
thickness:String,
displayPin:String,

}

}
// specifications:{

//   performance:{
//     processorBrand:"",
//     processorName:"",
//     generation:"",
//     cores:"",
//     clockSpeed:"",
//     cache:"",
//     gpu:""
//   },

//   memory:{
//     ram:"",
//     ramType:"",
//     ramFrequency:"",
//     expandableMemory:"",
//     storageType:"",
//     hdd:"",
//     ssd:""
//   },

//   display:{
//     screenSize:"",
//     resolution:"",
//     screenType:"",
//     touchscreen:""
//   },

//   general:{
//     brand:"",
//     modelNumber:"",
//     series:"",
//     color:"",
//     type:"",
//     batteryBackup:""
//   },

//   dimensions:{
//     size:"",
//     weight:""
//   },

//   additional:{
//     webcam:"",
//     keyboard:"",
//     antivirus:"",
//     fingerprint:""
//   },

//   os:{
//     os:"",
//     architecture:""
//   },

//   ports:{
//     usb:"",
//     hdmi:"",
//     mic:"",
//     cardReader:""
//   },

//   connectivity:{
//     wifi:"",
//     bluetooth:""
//   }

// }



},{
timestamps:true
})

module.exports = mongoose.model("product",productSchema)