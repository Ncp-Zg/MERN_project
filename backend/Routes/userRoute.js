const express = require("express");
const { registerUser, authUser, getUser, logoutUser } = require("../Controllers/userControllers");
const { protect } = require("../Middlewares/userMiddleware");


const router = express.Router();

router.route("/register").post(registerUser)
router.route("/login").post(authUser)
router.route("/profile").get(protect, getUser);
router.route("/logout").get(protect, logoutUser);

module.exports=router