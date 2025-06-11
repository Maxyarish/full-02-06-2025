const express = require("express");
const { registerSchema, loginSchema,updateSchema } = require("../validators/user.validator");
const { validate } = require("../middlewares/validate.mw");
const {
  registerUser,
  loginUser,
  getAccount,
  getAllUsers,
  updateUser,
} = require("../controllers/user.controller");
const {
  authorization,
  isAdmin,
  isOwner,
} = require("../middlewares/authorization.mw");

const router = express.Router();

router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);

router.get("/account", authorization, getAccount);
router.get("/", authorization, isAdmin, getAllUsers);
router.patch("/:idUser", authorization, isOwner,validate(updateSchema), updateUser);

module.exports = router;
