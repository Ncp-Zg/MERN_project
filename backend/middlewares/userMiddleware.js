const expressAsyncHandler = require("express-async-handler");
const jsonwebtoken = require("jsonwebtoken");
const User = require("../Modals/userModal");

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
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
    }
  
    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  });
  
  module.exports = { protect };