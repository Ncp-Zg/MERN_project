const mongoose = require("mongoose");
const User = require("../backend/Models/userModel");
require("dotenv").config()

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("mongodb is connected")
})

const io = require("socket.io")(8900,{
    cors:{
        origin:"http://localhost:3000"
    }
});

let users = [];

const addUser = async (userId, socketId) => {
     const user=await User.findById(userId)
    !users.some(user=>user.userId === userId) ? 
    users.push({userId, socketId, user}) : (users.splice(users.findIndex(usr=>usr.userId === userId),1,{userId, socketId, user}))
    
}

const removeUser = (socketId) => {
    users = users.filter(user=>user.socketId !== socketId)
}

io.on("connection",(socket)=>{
    console.log("user is connected")
    io.emit("welcome","this is socket server")
    //take userId and socketId from user
    socket.on("addUser", async (userId) =>{
        await addUser(userId,socket.id);
        io.emit("getUsers",users)
    });

    socket.on("disconnect",()=>{
        console.log("a user disconnected");
        removeUser(socket.id)
        io.emit("getUsers",users)
    })
})