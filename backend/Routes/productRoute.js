const express = require("express");
const { addProduct,addComment,getAllComments,getProducts } = require("../Controllers/productControllers");
const { commentMiddleware } = require("../Middlewares/commentsMiddleware");
const {productMiddleware,checkProductExist} = require("../Middlewares/productMiddleware");
const { protect } = require("../Middlewares/userMiddleware");

const router = express.Router();

router.route("/").get(productMiddleware)
router.route("/getallproducts").get(getProducts)
router.route("/add").post(protect,addProduct)
router.route("/myproducts").get()
router.route("/:product_id/getallcomments").get(checkProductExist,commentMiddleware)
router.route("/:product_id/addcomment").post(checkProductExist,protect,addComment)

module.exports=router