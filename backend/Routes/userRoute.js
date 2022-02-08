const express = require("express");
const { registerUser, authUser, getUser, logoutUser, addToFavorite, removeFromFavorite,getFavs, getMyProducts, editMyProduct, getIncomingOrders } = require("../Controllers/userControllers");
const { checkProductExist } = require("../Middlewares/productMiddleware");
const { protect } = require("../Middlewares/userMiddleware");


const router = express.Router();

router.route("/register").post(registerUser)
router.route("/login").post(authUser)
router.route("/profile").get(protect, getUser);
router.route("/profile/getfavorites").get(protect, getFavs);
router.route("/admin/getmyproducts").get(protect, getMyProducts);
router.route("/admin/:product_id/edit").put(checkProductExist, protect, editMyProduct);
router.route("/admin/incomingorders").get(protect, getIncomingOrders);
router.route("/logout").get(protect, logoutUser);
router.route("/:product_id/addtofavorite").get(checkProductExist,protect,addToFavorite);
router.route("/:product_id/removefromfavorite").get(checkProductExist,protect,removeFromFavorite);

module.exports=router