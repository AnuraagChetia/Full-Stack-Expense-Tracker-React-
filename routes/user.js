const express = require("express");
const router = express.Router();

const userController = require("../controller/user");
const expenseController = require("../controller/expense");

router.post("/signup", userController.signup);
router.post("/login", userController.login);

module.exports = router;
