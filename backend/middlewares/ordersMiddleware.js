const asyncErrorWrapper = require("express-async-handler");
const Product = require("../Models/productModel");


const ordersMiddleware =asyncErrorWrapper(async function (req, res, next) {
    // console.log(req.body)
    const arr = []
    const number = []
    const delivered = []
    const prep = []
    const sent = []
    await req.body.map(async (body)=>{
        let product = await Product.findById(body._id);
        arr.push(product)
        number.push(body.amount)
        delivered.push(false)
        prep.push(false)
        sent.push(false)

        
    })
    console.log(arr)
    setTimeout(()=>{
        // console.log(arr)
        req.number=number
        req.product = arr
        req.delivered = delivered
        req.prep = prep
        req.sent = sent
        next();
    },3000)
      
  
  
    });
  
  module.exports = ordersMiddleware;