const asyncErrorWrapper = require("express-async-handler");
const { paginationHelper } = require("../Helpers/paginationHelper");
const Product = require("../Modals/productModel");

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
  
  module.exports = productMiddleware;