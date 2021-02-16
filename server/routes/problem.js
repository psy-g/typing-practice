const express = require("express");
const authController = require("../controller");
const router = express.Router();

router.post("/random", authController.problem.random);
// router.post("/select", authController.problem.select);

module.exports = router;
