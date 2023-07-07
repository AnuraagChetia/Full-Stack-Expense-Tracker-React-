const Expense = require("../model/expense");


exports.getExpense = async (req, res) => {
  try {
    const response = await Expense.findAll({ where: { userId: req.user.id } });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.postExpense = async (req, res) => {
  const { category, amount, note } = req.body;
  try {
    console.log(req.user);
    const response = await Expense.create({
      category: category,
      amount: amount,
      note: note,
      userId: req.user.id,
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: error });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const id = req.params.id;
    const exp = await Expense.findByPk(id);
    if (req.user.id === exp.userId) {
      const result = await exp.destroy();
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
