const express = require("express");
const {
  authorization,
  isAdmin,
  canUpdateOrderStatus,
} = require("../middlewares/authorization.mw");
const { validate } = require("../middlewares/validate.mw");

const {
  createOrder,
  getAllOrders,
  getAccountOrders,
  getOrder,
  updateStatusOrder,
  createCheckoutSession,
} = require("../controllers/order.controller");

const {
  orderSchema,
  updateStatusOrderSchema,
} = require("../validators/order.validator");
const { pagination } = require("../middlewares/pagination.mw");
const { filterOrders } = require("../middlewares/filter.mw");
const { countOrders } = require("../controllers/order.controller");

const router = express.Router();

router.post("/", authorization, validate(orderSchema), createOrder);
router.get("/", authorization, isAdmin, pagination, filterOrders, getAllOrders);
router.get("/account", authorization, pagination, getAccountOrders);
router.get('/countOrders',authorization,isAdmin,countOrders)
router.get("/:orderId", authorization, getOrder);

router.patch(
  "/:orderId",
  authorization,
  canUpdateOrderStatus,
  validate(updateStatusOrderSchema),
  updateStatusOrder
);
router.post("/create-checkout-session", createCheckoutSession);

module.exports = router;
