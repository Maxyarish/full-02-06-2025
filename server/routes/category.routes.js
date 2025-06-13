const express = require("express");
const { categorySchema } = require("../validators/category.validator");
const { isAdmin, authorization } = require("../middlewares/authorization.mw");
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  deleteCategoryById,
  updateCategoryById
} = require("../controllers/category.controller");
const { validate } = require("../middlewares/validate.mw");

const router = express.Router();

router.get("/", getAllCategories);
router.get("/:idCategory", getCategoryById);
router.post(
  "/",
  authorization,
  isAdmin,
  validate(categorySchema),
  createCategory
);
router.patch("/:idCategory", authorization, isAdmin,  validate(categorySchema),updateCategoryById);
router.delete("/:idCategory", authorization, isAdmin,deleteCategoryById);

module.exports = router;
