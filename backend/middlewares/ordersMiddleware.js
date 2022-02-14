const asyncErrorWrapper = require("express-async-handler");
const CustomError = require("../Helpers/CustomError");
const Orders = require("../Models/ordersModel");
const Product = require("../Models/productModel");


const ordersMiddleware =asyncErrorWrapper(async function (req, res, next) {
    // console.log(req.body)
    const arr = []
    const number = []
    const delivered = []
    const prep = []
    const sent = []
    const deliveredAt = []
    const prepAt = []
    const sentAt = []
    const cargoTrackNumber = []
    await req.body.map(async (body)=>{
        let product = await Product.findById(body._id);
        arr.push(product)
        number.push(body.amount)
        delivered.push(false)
        prep.push(false)
        sent.push(false)
        deliveredAt.push("now")
        prepAt.push("now")
        sentAt.push("now")
        cargoTrackNumber.push("")

        
    })
    console.log(arr)
    setTimeout(()=>{
        // console.log(arr)
        req.number=number
        req.product = arr
        req.delivered = delivered
        req.prep = prep
        req.sent = sent
        req.deliveredAt = deliveredAt
        req.prepAt = prepAt
        req.sentAt = sentAt
        req.cargoTrackNumber = cargoTrackNumber
        next();
    },3000)
      
  
  
    });

const checkOrderExists =asyncErrorWrapper(async function (req, res, next) {
        const {order_id} = req.params
        const order = await Orders.findById(order_id).populate("order");
        if(order){
            req.data = order
            next()  
        }else{
            new CustomError("Provide a valid id ", 400)
        }
        
    });
  
  module.exports = {ordersMiddleware,checkOrderExists}