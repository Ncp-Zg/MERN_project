const express = require("express");
const { getProducts,addProduct } = require("../Controllers/productControllers");

const router = express.Router();

router.route("/").get(getProducts)
router.route("/add").post(addProduct)

module.exports=router