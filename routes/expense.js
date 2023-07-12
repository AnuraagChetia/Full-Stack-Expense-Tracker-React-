const express = require("express");

const expenseController = require("../controller/expense");

const userAuthentication = require("../middleware/auth");

const router = express.Router();

router.get("/get-expense", userAuthentication, expenseController.getExpense);
router.post("/add-expense", userAuthentication, expenseController.postExpense);
router.delete(
  "/delete-expense/:id",
  userAuthentication,
  expenseController.deleteExpense
);
router.get("/download", userAuthentication, expenseController.downloadExpense);

module.exports = router;
