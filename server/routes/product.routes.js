const express = require("express");
const { isAdmin, authorization } = require("../middlewares/authorization.mw");
const { validate } = require("../middlewares/validate.mw");
const upload = require("../middlewares/upload.mw");
const {
  createProductSchema,
  updateProductSchema,
} = require("../validators/product.validator");
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");
const CONSTANTS = require("../constants");
const { pagination } = require("../middlewares/pagination.mw");
const { buildFilterProducts } = require("../middlewares/filter.mw");

const router = express.Router();

router.post(
  "/",
  authorization,
  isAdmin,
  upload.array("images", CONSTANTS.MAX_LIMIT_IMG),
  validate(createProductSchema),
  createProduct
);

router.get("/",pagination,buildFilterProducts,getAllProducts);
router.get("/:idProduct", getProductById);

router.patch(
  "/:idProduct",
  authorization,
  isAdmin,
  upload.array("images", CONSTANTS.MAX_LIMIT_IMG),
  validate(updateProductSchema),
  updateProduct
);

router.delete('/:idProduct',authorization,isAdmin,deleteProduct);

module.exports = router;
