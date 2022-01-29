const expressAsyncHandler = require("express-async-handler");
const jsonwebtoken = require("jsonwebtoken");
const CustomError = require("../Helpers/CustomError");
const User = require("../Models/userModel");

const protect = expressAsyncHandler(async (req, res, next) => {
    let token;
  console.log(req.headers.authorization)
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
        console.log(token)
  
        //decodes token id
        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
  
        req.user = await User.findById(decoded.id).select("-password");
  
        next();
      } catch (error) {
        next(new CustomError("Not authorized, token failed", 401))
      }
    }
  
    if (!token) {
     next(new CustomError("Not authorized, no token",401));
    }
  });
  
  module.exports = { protect };