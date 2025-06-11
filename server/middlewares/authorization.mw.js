const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const CONSTANTS = require("../constants");
const User = require("../models/User");

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
