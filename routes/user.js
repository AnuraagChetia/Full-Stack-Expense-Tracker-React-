const express = require("express");
const router = express.Router();

const userController = require("../controller/user");
const authenticate = require("../middleware/auth");

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/get-user", authenticate, userController.getUser);

module.exports = router;
