const express = require("express");
const { paymentController } = require("../Controllers/paymentController");
const router = express.Router();

router.route("/add").post(paymentController)

module.exports=router