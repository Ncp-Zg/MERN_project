const asyncHandler = require("express-async-handler");
const generateToken = require("../Helpers/generateToken");
const User = require("../Models/userModel");


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
            token:generateToken(user._id),
            fav:[""]
        })
    }else{
        res.status(400)
        throw new Error("Error Occured")
    }
})

const authUser = asyncHandler(async(req,res)=>{
    const{email, password} = req.body

    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(user._id),
            fav:user.fav
        })
    }else{
        res.status(400);
        throw new Error("Invalid Email or Password")
    }
})

const getUser = asyncHandler(async(req,res)=>{

    res.json({
        success: true,
        data: {
          id: req.user.id,
          name: req.user.name,
        },
      });
})


const logoutUser = asyncHandler(async (req,res)=>{
        
    return res
.status(200)
.cookie({
  httpOnly: true,
  expires: new Date(Date.now()),
  secure: false,
})
.json({
  success: true,
  message: "Logout successful",
});
    
});

const addToFavorite = asyncHandler(async (req,res)=>{

const user = await User.findById(req.user.id);

if(!user.fav.includes(req.data._id)){
   user.fav.push(req.data._id); 
   await user.save(); 

res.status(201).json({
    id:user._id,
    name:user.name,
    email:user.email,
    fav:user.fav,
    admin:user.isAdmin,

})
}else{
    throw new Error("you already liked this Product")
}




    
});

const removeFromFavorite = asyncHandler(async (req,res)=>{
const id= req.data._id

const user = await User.findById(req.user.id);
const newFav = user.fav.filter(favorites=>favorites.toString() !== id.toString());
user.fav=newFav;
await user.save(); 

res.status(201).json({
    id:user._id,
    name:user.name,
    email:user.email,
    fav:user.fav,
    admin:user.isAdmin,

})

    
});




module.exports={
    registerUser,
    authUser,
    getUser,
    logoutUser,
    addToFavorite,
    removeFromFavorite
}