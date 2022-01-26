const express = require("express");
const { registerUser, authUser, getUser, logoutUser, likeProduct } = require("../Controllers/userControllers");
const { checkProductExist } = require("../Middlewares/productMiddleware");
const { protect } = require("../Middlewares/userMiddleware");


const router = express.Router();

router.route("/register").post(registerUser)
router.route("/login").post(authUser)
router.route("/profile").get(protect, getUser);
router.route("/logout").get(protect, logoutUser);
router.route("/:product_id/like").get(checkProductExist,protect,likeProduct);

module.exports=router