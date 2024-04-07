const express = require("express");
const router = express.Router();

const readController = require("../controllers/read.controller");
const readValidation = require("../validations/read.validation");
const requestValidator = require("../middlewares/requestValidator.middleware");

router.post(
  "/",
  requestValidator.validate(readValidation.createRead),
  readController.createRead
);

module.exports = router;
