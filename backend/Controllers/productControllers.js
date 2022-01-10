const asyncHandler = require("express-async-handler");
const data = require("../data.json")
const Product = require("../Modals/productModal");

const getProducts = asyncHandler(async(req,res)=>{

    const products = await Product.find({})

        res.status(201).json({
            success:true,
            data:products
        })
})

const addProduct = asyncHandler(async(req,res)=>{

    const {title,cost,stock,seller,desc,category,img} = req.body

    if(title && cost && stock && seller &&  category && desc && img){

        const product = await Product.create({
            title,cost,stock,seller,category,desc,img
        })


        res.status(201).json({
            _id:product._id,
            title:product.title,
            cost:product.cost,
            stock:product.stock,
            seller:product.seller,
            category:product.category,
            desc:product.desc,
            img:product.img
        })
    }else{
        throw new Error("missing information")
    }

    
        


})



module.exports={
    getProducts,
    addProduct
}