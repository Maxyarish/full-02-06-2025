const express = require("express");
const { isAdmin, authorization } = require("../middlewares/authorization.mw");
const { validate } = require("../middlewares/validate.mw");
const upload = require("../middlewares/upload.mw");
const { createProductSchema } = require("../validators/product.validator");
const { createProduct } = require("../controllers/product.controller");
const CONSTANTS = require("../constants");

const router = express.Router();

router.post(
  "/",
  authorization,
  isAdmin,
  upload.array("images", CONSTANTS.MAX_LIMIT_IMG),
  validate(createProductSchema),
  createProduct
);

module.exports = router;
