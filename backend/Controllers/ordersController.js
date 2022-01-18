const expressAsyncHandler = require("express-async-handler")
const Orders = require("../Modals/ordersModel")

const addOrder = expressAsyncHandler(async(req,res)=>{
    // console.log(req.product)

    const order = req.body

    if(order){

        const newOrder = await Orders.create({
            order:req.product,
            user:req.user
        })
        
        res.status(201).json({
            _id:newOrder._id,
            order:newOrder.order,
            user:newOrder.user

        })
    }else{
        throw new Error("missing information")
    }
})


module.exports={
    addOrder
}