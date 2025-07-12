const mongoose = require("mongoose");
const { boolean } = require("yup");
const CONSTANTS = require("../constants");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 255,
    },
    description: {
      type: String,
      minLength: 3,
      maxLength: 255,
    },
    price: {
      type: Number,
      required: true,
      min: 1,
      max: 10000000,
    },
    stockQty: {
      type: Number,
      default: 1,
      min: 1,
      max: 1000,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      req: true,
    },
    isSale: {
      type: boolean(),
      default: false,
    },
    images: {
      type: [String],
      validate: [
        (arr) => arr.length <= CONSTANTS.MAX_LIMIT_IMG,
        "limit images = 5" + CONSTANTS.MAX_LIMIT_IMG,
      ],
    },
  },
  { timestamps: true }
);
productSchema.index({ title: 1, category: 1 }, { unique: true });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
