const express = require("express");
const { registerUser, authUser, getUser, logoutUser } = require("../Controllers/userControllers");
const { protect } = require("../Middlewares/userMiddleware");


const router = express.Router();

router.route("/register").post(registerUser)
router.route("/login").post(authUser)
router.get("/profile", protect, getUser);
router.get("/logout", protect, logoutUser);

module.exports=router