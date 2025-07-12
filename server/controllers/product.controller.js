const fs = require("fs/promises");
const createError = require("http-errors");
const path = require("path");
const Product = require("../models/Product");
const CONSTANTS = require("../constants");

module.exports.createProduct = async (req, res, next) => {
  try {
    const images = req.files?.map((item) => item.filename) || [];
    const product = await Product.create({ ...req.body, images });
    res.status(201).send({ data: product });
  } catch (error) {
    if (error.code === 11000) {
      return next(
        createError(400, "Product in this category is already exists")
      );
    }
    next(error);
  }
};

module.exports.getAllProducts = async (req, res, next) => {
  const { limit, skip } = req.pagination;
  try {
    const products = await Product.find()
      .populate("category")
      .limit(skip)
      .skip(limit);
    if (!products) {
      throw createError(404, "Products not found");
    }
    res.status(200).send({ data: products });
  } catch (error) {
    next(error);
  }
};

module.exports.getProductById = async (req, res, next) => {
  try {
    const { idProduct } = req.params;
    const product = await Product.findById(idProduct).populate({
      path: "category",
      selected: ["_id", "name"],
    });
    if (!product) {
      throw createError(404, "Product not found");
    }
    res.status(200).send({ data: product });
  } catch (error) {
    next(error);
  }
};

module.exports.updateProduct = async (req, res, next) => {
  try {
    const { idProduct } = req.params;

    const product = await Product.findById(idProduct);
    if (!product) {
      throw createError(404, "Product not found");
    }
    if (req.files && product.images.length) {
      await Promise.all(
        product.images.map((img) =>
          fs.unlink(path.join(__dirname, "..", CONSTANTS.UPLOAD_FOLDER, img))
        )
      );
    }

    const updatedImages =
      req.files?.map((item) => item.filename) || product.images;
    Object.assign(product, req.body({ images: updatedImages }));
    await product.save();

    res.status(200).send({ data: product });
  } catch (error) {
    if (error.code === 11000) {
      return next(
        createError(400, "Product in this category is already exists")
      );
    }
    next(error);
  }
};
module.exports.deleteProduct = async (req, res, next) => {
  try {
    const { idProduct } = req.params;
    const product = await Product.findByIdAndDelete(idProduct);
    if (!product) {
      throw createError(404, "Product not found");
    }
    if (product.images.length) {
      await Promise.all(
        product.images.map((img) =>
          fs.unlink(path.join(__dirname, "..", CONSTANTS.UPLOAD_FOLDER, img))
        )
      );
    }
    res.status(200).send({ data: product });
  } catch (error) {
    next(error);
  }
};
