const express = require("express");
const { authorization, isAdmin } = require("../middlewares/authorization.mw");
const { validate } = require("../middlewares/validate.mw");
const {
  createOrder,
  getAllOrders,
  getAccountOrders,
  getOrder,
  updateStatusOrder
} = require("../controllers/order.controller");
const { orderSchema,updateStatusOrderSchema } = require("../validators/order.validator");
const { pagination } = require("../middlewares/pagination.mw");
const { filterOrders } = require("../middlewares/filter.mw");
const { updateMany } = require("../models/User");

const router = express.Router();

router.post("/", authorization, validate(orderSchema), createOrder);
router.get("/", authorization, isAdmin, pagination,filterOrders, getAllOrders);
router.get("/account", authorization, pagination, getAccountOrders);
router.get('/:orderId',authorization,getOrder)
router.patch('/:orderId',authorization,isAdmin,validate(updateStatusOrderSchema),updateStatusOrder);
module.exports = router;
