const mongoose = require("mongoose")



const commentSchema = mongoose.Schema(
    {
        comment:{
            type:String,
            required:true
        },

        user:{
            type:mongoose.Schema.ObjectId,
            ref:"User"
        },

        product:{
            type:mongoose.Schema.ObjectId,
            ref:"Product"
        },

        rating:{
            type:Number,
            required:true
        }

    },
    {
        timestamps:true,
    }
);

const Comment = mongoose.model("Comment",commentSchema)

module.exports=Comment