const express = require("express");
const router = express.Router();

const readController = require("../controllers/read.controller");

router.post("/", readController.createRead);

module.exports = router;
