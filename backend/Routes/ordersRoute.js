const express = require("express");
const { addOrder } = require("../Controllers/ordersController");
const ordersMiddleware = require("../Middlewares/ordersMiddleware");
const { protect } = require("../Middlewares/userMiddleware");
const router = express.Router();

router.route("/").post(protect,ordersMiddleware,addOrder)

module.exports=router