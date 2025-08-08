const mongoose = require("mongoose");
const CONSTANTS = require("../constants");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        productPrice: {
          type: Number,
          ref: "Product",
          required: true,
        },
        quantity:{
            type:Number,
            default:1,
            min:1,
            max:100000
        }
      },
    ],
    shippingPhone: {
      type: String,
      required:true
    },
    shippingMethod: {
      type: String,
      enum: CONSTANTS.SHIPPING_METHODS,
      default: CONSTANTS.SHIPPING_METHODS[0],
    },
    shippingAdress: {
      type: String,
    },
    shippingPrice: {
      type: Number,
      default: 0,
      required:true
    },
    totalSumma:{
        type:Number,
        min:0.01
    },
    status:{
        type:String,
        enum:CONSTANTS.ORDER_STATUS,
        default:CONSTANTS.ORDER_STATUS[0]
    }
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
