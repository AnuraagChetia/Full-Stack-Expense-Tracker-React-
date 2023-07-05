const express = require("express");

const expenseController = require("../controller/expense");

const router = express.Router();

router.get("/get-expense", expenseController.getExpense);
router.post("/add-expense", expenseController.postExpense);
router.delete("/delete-expense/:id", expenseController.deleteExpense);

module.exports = router;
