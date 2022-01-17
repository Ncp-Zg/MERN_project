const express = require("express");
const { addProduct } = require("../Controllers/productControllers");
const productMiddleware = require("../Middlewares/productMiddleware");
const { protect } = require("../Middlewares/userMiddleware");

const router = express.Router();

router.route("/").get(productMiddleware)
router.route("/add").post(protect,addProduct)
router.route("/myproducts").get()

module.exports=router