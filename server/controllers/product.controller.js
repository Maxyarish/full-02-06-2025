const createError = require("http-errors");
const Product = require("../models/Product");

module.exports.createProduct = async (req, res, next) => {
  try {
    const images = req.files?.map(item=>item.filename)
    const product = await Product.create({...req.body,images});
    res.status(201).send({ data: product });
  } catch (error) {
    if (error.code === 11000) {
      return next(createError(400, "Product is already exists"));
    }
    next(error);
  }
};
