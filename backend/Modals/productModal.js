const mongoose = require("mongoose")



const productSchema = mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
        },
        
        cost:{
            type:Number,
            required:true,
        },
        
        stock: {
            type:Number,
            required:true,
        },

        seller: {
            type: String,
            required:true,
        },

        desc: {
            type:String,
            required:true,
        },

        img : {
            type:Array,
            required:true
        },

        category: {
            type:String,
            required:true
        }

    },
    {
        timestamps:true,
    }
);

const Product = mongoose.model("Product",productSchema)

module.exports=Product