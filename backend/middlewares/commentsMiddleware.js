const asyncErrorWrapper = require("express-async-handler");
const { paginationHelper } = require("../Helpers/paginationHelper");
const Comment = require("../Models/commentModel");
const Product = require("../Models/productModel");

const commentMiddleware =asyncErrorWrapper(async function (req, res, next) {
    let query = Comment.find({product:req.data._id});
    console.log(query);
      //Pagination
      const total= await req.data.comments.length;
      console.log(total)
      const paginationResult = await paginationHelper(total,query,req);
  
      query = paginationResult.query;
  
      const pagination = paginationResult.pagination;
      
  
      const queryResults = await query.populate("user");
      

      res.status(201).json({
        success:true,
        data:queryResults,
        total:total,
        count:queryResults.length,
        pagination:pagination,
    })

  
      next();
  
  
    });

  
  module.exports = {commentMiddleware};