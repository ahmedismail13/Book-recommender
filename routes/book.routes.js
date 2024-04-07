const express = require("express");
const router = express.Router();

const BookController = require("../controllers/book.controller");

router.get("/recommendations", BookController.getRecommendations);

router.post("/", BookController.createBook);

module.exports = router;
