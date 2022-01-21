const express = require("express");
const { addOrder, getOrders, changeState } = require("../Controllers/ordersController");
const ordersMiddleware = require("../Middlewares/ordersMiddleware");
const { protect } = require("../Middlewares/userMiddleware");
const router = express.Router();

router.route("/myorders").get(protect,getOrders)
router.route("/myorders/changeState").post(protect,changeState)
router.route("/addorders").post(protect,ordersMiddleware,addOrder)


module.exports=router