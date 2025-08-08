const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const CONSTANTS = require("../constants");
const User = require("../models/User");
const Order = require("../models/Order");

module.exports.authorization = async (req, res, next) => {
  try {
    const rowAuthorization = req.headers.authorization;
    const token = rowAuthorization?.replace("Bearer", "").trim();
    if (!token) {
      throw createError(401, "Token required, Please register ");
    }

    const decoded = jwt.verify(token, CONSTANTS.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      throw createError(401, "Invalid token  ");
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("authorization error ->", error);
    next(createError(401, "Unauthorizated"));
  }
};

module.exports.isAdmin = async (req, res, next) => {
  if (req.user?.role === "admin") {
    return next();
  }
  next(createError(403, "Only Admin!"));
};

module.exports.isOwner = async (req, res, next) => {
  if (req.params.idUser === req.user?._id.toString()) {
    return next();
  }
  next(createError(403, "Only Owner!"));
};
module.exports.canUpdateOrderStatus=async(req,res,next)=>{
  try {
    const order=await Order.findById(req.params.orderId)
    if(!order){
      return next(404,'order not found')
    }
    if (req.user.role==='admin' || req.user._id===ordet.user.toString()) {
      return next()
    }
return next(createError(403,'you do not have permission'))
  } catch (error) {
    next(createError(403,'you do not have permission'))
  }
}