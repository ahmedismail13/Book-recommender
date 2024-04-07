const express = require("express");
const router = express.Router();

const BookController = require("../controllers/book.controller");
const BookValidation = require("../validations/book.validation");
const RequestValidator = require("../middlewares/requestValidator.middleware");

router.get("/recommendations", BookController.getRecommendations);

router.post(
  "/",
  RequestValidator.validate(BookValidation.createBook),
  BookController.createBook
);

module.exports = router;
