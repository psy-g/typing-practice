const express = require("express");
const authController = require("../controller");
const router = express.Router();

router.post("/signup", authController.auth.signup);
// router.post("/signout", authController.auth.signout);
// router.post("/signin", authController.auth.signin);

module.exports = router;
