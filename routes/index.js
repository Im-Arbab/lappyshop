const express = require('express')

const router = express.Router()

const userSignUpController = require("../controller/user/userSignUp")
const userSignInController = require('../controller/user/userSignIn')
const userDetailsController = require('../controller/user/userDetails')
const authToken = require('../middleware/authToken')
const userLogout = require('../controller/user/userLogout')
const allUsers = require('../controller/user/allUsers')
const updateUser = require('../controller/user/updateUser')
const UploadProductController = require('../controller/product/uploadProduct')
const getProductController = require('../controller/product/getProduct')
const updateProductController = require('../controller/product/updateProduct')
const getCategoryProduct = require('../controller/product/getCategoryProductOne')
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct')
const getProductDetails = require('../controller/product/getProductDetails')
const addToCartController = require('../controller/user/addToCartController')
const countAddToCartProduct = require('../controller/user/countAddToCartProduct')
const addToCartViewProduct  = require('../controller/user/addToCartViewProduct')
const updateAddToCartProduct = require('../controller/user/updateAddToCartProduct')
const deleteAddToCartProduct = require('../controller/user/deleteAddToCartProduct')
const searchProduct = require('../controller/product/searchProduct')
const filterProductController = require('../controller/product/filterProduct')
const createOrder = require('../controller/order/createOrder')
const createOrderCOD = require("../controller/order/createOrderCOD")
const createRazorpayOrder = require("../controller/order/createRazorpayOrder")
const verifyPayment = require("../controller/order/verifyPayment")
const getUserOrders = require('../controller/order/getUserOrders')
const getAllOrders = require('../controller/order/getAllOrders')
const updateOrderStatus = require('../controller/order/updateOrderStatus')
const updateStock = require('../controller/product/updateStock')
const getAdminStats = require('../controller/admin/getStats')
const cancelOrder = require('../controller/order/cancelOrder')
const addAddress = require("../controller/address/addAddress")
const getUserAddress = require("../controller/address/getUserAddress")
const deleteAddress = require("../controller/address/deleteAddress")
const getSingleOrder = require("../controller/order/getSingleOrder")
const getDashboardStats = require('../controller/order/getDashboardStats')
const deleteProduct = require('../controller/product/deleteProduct')
const sendOtp = require('../controller/auth/sendOtp')
const verifyOtp = require('../controller/auth/verifyOtp')
const forgotPassword = require('../controller/user/forgotPassword')
const resetPassword = require('../controller/user/resetPassword')


router.post("/signup",userSignUpController)
router.post("/signin",userSignInController)
router.get("/user-details",authToken,userDetailsController)
router.get("/userLogout",userLogout)

//admin panel 
router.get("/all-user",authToken,allUsers)
router.post("/update-user",authToken,updateUser)
// router.get("/admin-dashboard", authToken, getDashboardStats)

//product
router.post("/upload-product",authToken,UploadProductController)
router.get("/get-product",getProductController)
router.post("/update-product",authToken,updateProductController)
router.get("/get-categoryProduct",getCategoryProduct)
router.post("/category-product",getCategoryWiseProduct)
router.post("/product-details",getProductDetails)
router.get("/search",searchProduct)
router.post("/filter-product",filterProductController)

//user add to cart
router.post("/addtocart",authToken,addToCartController)
router.get("/countAddToCartProduct",authToken,countAddToCartProduct)
router.get("/view-card-product",authToken,addToCartViewProduct)
router.post("/update-cart-product",authToken,updateAddToCartProduct)
router.post("/delete-cart-product",authToken,deleteAddToCartProduct)


// order....
router.post("/create-order", authToken, createOrder)
router.post("/create-order-cod", authToken, createOrderCOD)
router.post("/create-razorpay-order", authToken, createRazorpayOrder)
router.post("/verify-payment", authToken, verifyPayment)
router.get("/my-orders", authToken, getUserOrders)
router.get("/all-orders", authToken, getAllOrders)
router.post("/update-order-status", authToken, updateOrderStatus)
router.get("/order/:id", authToken, getSingleOrder)


//stock
router.post("/update-stock", authToken, updateStock)
router.get("/admin-stats", authToken, getAdminStats)
// router.get("/order/:id", authToken, getSingle)
router.post("/cancel-order", authToken, cancelOrder)
// router.post("/update-order-status", authToken, updateOrderStatus)
router.post("/delete-product", authToken, deleteProduct)

router.post("/add-address", authToken, addAddress)
router.get("/get-address", authToken, getUserAddress)
router.post("/delete-address", authToken, deleteAddress)

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);



module.exports = router