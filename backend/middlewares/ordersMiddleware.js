const asyncErrorWrapper = require("express-async-handler");
const Product = require("../Modals/productModel");


const ordersMiddleware =asyncErrorWrapper(async function (req, res, next) {
    // console.log(req.body)
    const arr = []
    await req.body.map(async (body)=>{
        let product = await Product.findById(body.id);
        arr.push(product)
        
    })
    // console.log(arr)
    setTimeout(()=>{
        // console.log(arr)
        req.product = arr
        next();
    },3000)
      
  
  
    });
  
  module.exports = ordersMiddleware;