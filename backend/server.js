const express = require("express");
const dotenv= require("dotenv")
const userRoute = require("./Routes/userRoute");
const productRoute = require("./Routes/productRoute");
const ordersRoute = require("./Routes/ordersRoute");
const paymentRoute = require("./Routes/paymentRoute");
const connectDB = require("./Config/db");
const cors = require("cors");
const customErrorHandler = require("./Middlewares/errorMiddleware");
const path = require("path");



const app = express();

app.use(cors({origin: "http://localhost:5000"}));
app.use(express.json())
dotenv.config();
connectDB();
app.use("/api/users", userRoute );
app.use("/api/products", productRoute );
app.use("/api/orders", ordersRoute );
app.use("/api/payment", paymentRoute );

// --------deployment ---------------

const __dirname1 = path.resolve();
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname1,"/frontend/build")));

    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname1,"frontend","build","index.html"))
    })
}else{
    app.get("/",(req,res)=>{
        res.send("API is running...");
    })
}


// --------deployment ---------------


app.use(customErrorHandler);

const PORT = process.env.PORT
app.listen(PORT,console.log(`server is running on PORT ${PORT}`))


//--------------socket.io--------------

const User = require("./Models/userModel");


const io = require("socket.io")(process.env.HOST,{
    cors:{
        origin:"http://localhost:5000"
    }
});

let seller;
let data;

const addUser = async (userId, socketId) => {
     const user=await User.findById(userId)
     seller = {userId, socketId, user}
    
}

const findOrder = async (i,userId) => {
     const usr=await User.findById(userId)
     const order=usr.incomingOrders[i];
     data = order

    
}


io.on("connection",(socket)=>{
    console.log("user is connected")
    io.emit("welcome","this is socket server")
    //take userId and socketId from user

    socket.on("changeState", async ({i,userId})=>{
        if(userId.match(/^[0-9a-fA-F]{24}$/)){await findOrder(i,userId)
        io.emit("changes",data)}
    })


    socket.on("addUser", async (userId) =>{
        if(userId.match(/^[0-9a-fA-F]{24}$/)){await addUser(userId,socket.id);
        io.emit("getUsers",seller)}
    });

    // socket.on("disconnect",()=>{
    //     console.log("a user disconnected");
    //     removeUser(socket.id)
    //     io.emit("getUsers",users)
    // })
})

