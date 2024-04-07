const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
const UserValidation = require("../validations/user.validation");
const RequestValidator = require("../middlewares/requestValidator.middleware");

router.post(
  "/",
  RequestValidator.validate(UserValidation.createUser),
  userController.createUser
);

module.exports = router;
