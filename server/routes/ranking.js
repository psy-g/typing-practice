const express = require("express");
const rankingController = require("../controller");
const router = express.Router();

router.post("/register", rankingController.ranking.register);
router.get("/print", rankingController.ranking.print);

module.exports = router;
