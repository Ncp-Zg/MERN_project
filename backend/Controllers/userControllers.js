const asyncHandler = require("express-async-handler");
const generateToken = require("../Helpers/generateToken");
const User = require("../Modals/userModal");


const registerUser = asyncHandler(async(req,res)=>{
    const{name,email,password} =req.body

    const userExist = await User.findOne({email});

    if(userExist) {
        res.status(400)
        throw new Error("User already exist")
        
    }

    const user = await User.create({
        name,email,password
    })

    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error("Error Occured")
    }
})


module.exports={
    registerUser
}