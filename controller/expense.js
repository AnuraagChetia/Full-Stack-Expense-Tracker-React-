const Expense = require("../model/expense");

exports.getExpense = async (req, res) => {
  try {
    const response = await Expense.findAll();
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
