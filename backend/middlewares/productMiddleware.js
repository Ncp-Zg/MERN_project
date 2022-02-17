const asyncErrorWrapper = require("express-async-handler");
const { paginationHelper } = require("../Helpers/paginationHelper");
const Product = require("../Models/productModel");

const productMiddleware =asyncErrorWrapper(async function (req, res, next) {
    let query = Product.find();
      //Pagination
      const total= await Product.countDocuments();
      console.log(total)
      const paginationResult = await paginationHelper(total,query,req);
  
      query = paginationResult.query;
  
      const pagination = paginationResult.pagination;
      console.log(pagination)
  
      const queryResults = await query;

      res.status(201).json({
        success:true,
        data:queryResults,
        total:total,
        count:queryResults.length,
        pagination:pagination,
    })

  
      next();
  
  
    });

const checkProductExist =asyncErrorWrapper(async function (req, res, next) {
    
    const product_id = req.params.product_id;
    const product = await Product.findById(product_id).populate({path:"comments",populate:{path:"user"}});
    console.log(product_id);
    

    if(!product){
        throw new Error("There is no such product with that id!!")
    }
    req.data=product
    next();
  
    });
  
  module.exports = {productMiddleware,checkProductExist};