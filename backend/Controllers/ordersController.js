const expressAsyncHandler = require("express-async-handler");
const Orders = require("../Models/ordersModel");
const Product = require("../Models/productModel");
const User = require("../Models/userModel");

const addOrder = expressAsyncHandler(async (req, res) => {
  // console.log(req.product)

  const order = req.body;

  if (order) {
    const newOrder = await Orders.create({
      order: req.product,
      amount: req.number,
      user: req.user,
      preparing: req.prep,
      sentbycargo: req.sent,
      delivered: req.delivered,
    });
    await req.product.map(async (prdct,index) => {
        const productseller = await User.findById(prdct.seller);
        console.log(productseller);
        
        
        productseller.incomingOrders.push({
            data:prdct,
            amount:req.number[index],
            toWho:req.user,
            orderedAt:newOrder.createdAt,
            orderId:newOrder.id
        })
        await productseller.save()
    });

    

    res.status(201).json({
      _id: newOrder._id,
      amount: newOrder.amount,
      order: newOrder.order,
      user: newOrder.user,
    });
  } else {
    throw new Error("missing information");
  }
});

const getOrders = expressAsyncHandler(async (req, res) => {
  const myorders = await Orders.find({ user: req.user.id }).populate("order");
  console.log(myorders);

  res.status(201).json({
    myorders: myorders,
  });
});

const changePreparing = expressAsyncHandler(async (req, res) => {
  const { orderId, productId } = req.body;
  const order = await Orders.findById(orderId);

  await order.order.forEach(async (ordr,index) => {
    if(ordr.toString() === productId){


      order.preparing[index] = true;
      await order.save();

      res.status(201).json({
        preparing:order.preparing
      })
    }
  })
});

const changeSentByCargo = expressAsyncHandler(async (req, res) => {
  const { orderId, productId } = req.body;
  const order = await Orders.findById(orderId);

  await order.order.forEach(async (ordr,index) => {
    if(ordr.toString() === productId){


      order.sentbycargo[index] = true;
      await order.save();

      res.status(201).json({
        sentbycargo:order.sentbycargo
      })
    }
  })
});

const changeDelivered = expressAsyncHandler(async (req, res) => {
  const { orderId,index } = req.body;

  const order = await Orders.findById(orderId);
  console.log(index);

  order.delivered[index] = true;

  await order.save();

  if (order.delivered[index]) {
    order.order.map(async (item) => {
      let product = await Product.findById(item._id);
      product.customer.push(req.user.id);
      await product.save();
    });
  }

  console.log(order.delivered)

  res.status(201).json({
    delivered: order.delivered,
  });
});

module.exports = {
  addOrder,
  getOrders,
  changeDelivered,
  changePreparing,
  changeSentByCargo
};
