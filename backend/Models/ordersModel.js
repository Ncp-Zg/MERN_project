const mongoose = require("mongoose")



const ordersSchema = mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.ObjectId,
            ref:"User",
            
        },
        order:[
            {
                type:mongoose.Schema.ObjectId,
                ref:"Product"
            },
            
        ],
        amount: [
            
        ],
        delivered:Boolean
    },
    {
        timestamps:true,
    }
);


const Orders = mongoose.model("Orders",ordersSchema)

module.exports=Orders