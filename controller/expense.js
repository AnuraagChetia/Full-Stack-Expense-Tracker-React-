const Expense = require("../model/expense");
const jwt = require("jsonwebtoken");

exports.getExpense = async (req, res) => {
  try {
    const token = req.header("Authorization");
    const user = jwt.verify(token, "thisiskey");
    const userId = user.id;
    console.log(userId);
    const response = await Expense.findAll({ where: { userId: userId } });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.postExpense = async (req, res) => {
  const { category, amount, note } = req.body;
  try {
    const response = await Expense.create({
      category: category,
      amount: amount,
      note: note,
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ err: error });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const id = req.params.id;
    const exp = await Expense.findByPk(id);
    const result = await exp.destroy();
    res.status(200).json(result);
    console.log(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
