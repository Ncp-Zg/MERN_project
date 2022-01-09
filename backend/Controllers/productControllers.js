const asyncHandler = require("express-async-handler");
const data = require("../data.json")
const Product = require("../Modals/productModal");

const getProducts = asyncHandler(async(req,res)=>{

    // const products = await Product.find({})

        res.status(201).json({
            success:true,
            data:data
        })
})

const addProduct = asyncHandler(async(req,res)=>{

    const {title,price,stock,seller,desc,category} = req.body

    if(title && price && stock && seller &&  category && desc){

        const product = await Product.create({
            title,price,stock,seller,category,desc
        })


        res.status(201).json({
            _id:product._id,
            title:product.title,
            price:product.price,
            stock:product.stock,
            seller:product.seller,
            category:product.category,
            desc:product.desc
        })
    }else{
        throw new Error("missing information")
    }

    
        


})



module.exports={
    getProducts,
    addProduct
}