const express = require("express");
const router = express.Router();

const passwordController = require("../controller/password");

router.post("/forgetpassword", passwordController.resetPassword);

module.exports = router;
