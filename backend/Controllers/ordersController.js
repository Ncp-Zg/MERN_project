const expressAsyncHandler = require("express-async-handler")
const Orders = require("../Models/ordersModel")

const addOrder = expressAsyncHandler(async(req,res)=>{
    // console.log(req.product)

    const order = req.body

    if(order){

        const newOrder = await Orders.create({
            order:req.product,
            amount:req.number,
            user:req.user,
            delivered:false

        })
        
        res.status(201).json({
            _id:newOrder._id,
            amount:newOrder.amount,
            order:newOrder.order,
            user:newOrder.user,
            

        })
    }else{
        throw new Error("missing information")
    }
})

const getOrders = expressAsyncHandler(async(req,res)=>{
   const myorders = await Orders.find({user:req.user.id}).populate('order')
   console.log(myorders)

   res.status(201).json({
    myorders:myorders

})
})





module.exports={
    addOrder,
    getOrders
}