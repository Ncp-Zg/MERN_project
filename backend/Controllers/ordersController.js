const expressAsyncHandler = require("express-async-handler");
const CustomError = require("../Helpers/CustomError");
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
      preparedAt: req.prepAt,
      sentAt: req.sentAt,
      deliveredAt: req.deliveredAt,
      cargoTrackNumber: req.cargoTrackNumber

    });



    await req.product.map(async (prdct,index) => {
        const productseller = await User.findById(prdct.seller);
        console.log(productseller);

        if(prdct.stock >= req.number[index]){
        
          const SingleProduct = await Product.findById(prdct.id);
          SingleProduct.stock = SingleProduct.stock - req.number[index]

          await SingleProduct.save();
          
          productseller.incomingOrders.push({
            product:prdct,
            amount:req.number[index],
            toWho:req.user,
            orderedAt:newOrder.createdAt,
            orderId:newOrder,
            prepared:false,
            cargotracknumber:""
        })
        await productseller.save()
        }
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

const getSingleOrder = expressAsyncHandler(async (req, res) => {
  res.status(200).json({
    data:req.data
  })
});

const changePreparing = expressAsyncHandler(async (req, res) => {
  const { orderId, productId, index } = req.body;
  const order = await Orders.findById(orderId);

  const user = await User.findById(req.user.id);
  user.incomingOrders[index].prepared=true;
  user.markModified("incomingOrders");
  await user.save();


  await order.order.forEach(async (ordr,index) => {
    if(ordr.toString() === productId){


      order.preparing[index] = true;
      order.preparedAt[index] = new Date();
      await order.save();

      res.status(201).json({
        preparing:order.preparing
      })
    }
  })
});

const changeSentByCargo = expressAsyncHandler(async (req, res) => {
  const { orderId, productId, trackNo ,i } = req.body;
  console.log(trackNo)
  const order = await Orders.findById(orderId);

  const user = await User.findById(req.user.id);
  user.incomingOrders[i].cargotracknumber=trackNo.toString();
  user.markModified("incomingOrders");
  await user.save();

  await order.order.forEach(async (ordr,index) => {
    if(ordr.toString() === productId){


      order.sentbycargo[index] = true;
      order.sentAt[index] = new Date();
      order.cargoTrackNumber[index] = trackNo.toString();
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
  order.deliveredAt[index] = new Date();

  await order.save();

  if (order.delivered[index]) {
    
      let product = await Product.findById(order.order[index]);
      if(!product.customer.includes(req.user.id)){
          product.customer.push(req.user.id);
          await product.save();
      }
      
    
  }

  res.status(201).json({
    delivered: order.delivered,
  });
});

module.exports = {
  addOrder,
  getOrders,
  changeDelivered,
  changePreparing,
  changeSentByCargo,
  getSingleOrder
};
