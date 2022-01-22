const asyncHandler = require("express-async-handler");
const Product = require("../Models/productModel");
const Comment = require("../Models/commentModel");

// const getProducts = asyncHandler(async(req,res)=>{

//     const products = await Product.find({})

//         res.status(201).json({
//             success:true,
//             data:products
//         })
// })

const addProduct = asyncHandler(async (req, res) => {
  const { title, cost, stock, seller, desc, category, img } = req.body;

  if (title && cost && stock && seller && category && desc && img) {
    const product = await Product.create({
      title,
      cost,
      stock,
      seller,
      category,
      desc,
      img,
    });

    res.status(201).json({
      _id: product._id,
      title: product.title,
      cost: product.cost,
      stock: product.stock,
      seller: product.seller,
      category: product.category,
      desc: product.desc,
      img: product.img,
    });
  } else {
    throw new Error("missing information");
  }
});

const addComment = asyncHandler(async (req, res) => {


  if (req.data.customer.includes(req.user.id)) {
    const newComment = await Comment.create({
      comment: req.body.comment,
      user: req.user,
      product: req.data,
    });

    const product = await Product.findById(req.params.product_id);

    product.comments.push(newComment)

    await product.save(); 

    res.status(201).json({
      comment: newComment.comment,
      user: newComment.user,
      product: newComment.product,
    });
  }else{
    throw new Error("only who bought this product can do comment below")
  }
});

const getAllComments = asyncHandler(async (req, res) => {
  
    res.status(201).json({
        comments:req.data.comments
    })
    
});

module.exports = {
  addProduct,
  addComment,
  getAllComments
};
