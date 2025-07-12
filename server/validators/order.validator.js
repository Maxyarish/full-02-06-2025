const Yup = require("yup");
const CONSTANTS = require("../constants");

module.exports.orderSchema = Yup.object({
  products: Yup.array().of(
    Yup.object({
         productId: Yup.string().trim().required(),
         quantity:Yup.number().min(1)
        })
  ),
  shippingPhone:Yup.string().trim().required(),
  shippingMethod: Yup.string().trim().oneOf(CONSTANTS.SHIPPING_METHODS),
  shippingAddress: Yup.string().trim(),
  shippingPrice: Yup.number().min(0),
});
module.exports.orderSchema = Yup.object({
status:Yup.string().trim().oneOf(CONSTANTS.ORDER_STATUSES).required(),
});
