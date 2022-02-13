const express = require("express");
const { addOrder, getOrders, changePreparing, changeDelivered, changeSentByCargo, getSingleOrder } = require("../Controllers/ordersController");
const {ordersMiddleware,checkOrderExists} = require("../Middlewares/ordersMiddleware");
const { protect } = require("../Middlewares/userMiddleware");
const router = express.Router();

router.route("/myorders").get(protect,getOrders)
router.route("/myorders/:order_id").get(protect,checkOrderExists,getSingleOrder)
router.route("/myorders/changedelivered").post(protect,changeDelivered)
router.route("/myorders/changepreparing").post(protect,changePreparing)
router.route("/myorders/changesentbycargo").post(protect,changeSentByCargo)
router.route("/addorders").post(protect,ordersMiddleware,addOrder)


module.exports=router