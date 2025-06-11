const express = require("express");
const { categorySchema } = require("../validators/category.validator");
const { isAdmin, authorization } = require("../middlewares/authorization.mw");
const { createCategory } = require("../controllers/category.controller");
const { validate } = require("../middlewares/validate.mw");

const router = express.Router();

router.post('/',authorization,isAdmin,validate(categorySchema),createCategory)

module.exports = router
