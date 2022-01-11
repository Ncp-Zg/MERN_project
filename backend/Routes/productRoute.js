const express = require("express");
const { getProducts,addProduct } = require("../Controllers/productControllers");
const { protect } = require("../Middlewares/userMiddleware");

const router = express.Router();

router.route("/").get(getProducts)
router.route("/add").post(protect,addProduct)
router.route("/myproducts").get()

module.exports=router