const Expense = require("../model/expense");
const User = require("../model/user");
const sequelize = require("../util/database");

exports.getExpense = async (req, res) => {
  try {
    const response = await Expense.findAll({ where: { userId: req.user.id } });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.postExpense = async (req, res) => {
  const t = await sequelize.transaction();
  const { category, amount, note } = req.body;
  try {
    const response = await Expense.create(
      {
        category: category,
        amount: amount,
        note: note,
        userId: req.user.id,
      },
      {
        transaction: t,
      }
    );
    const updatedTotalExpense = Number(req.user.totalExpense) + Number(amount);
    User.update(
      { totalExpense: updatedTotalExpense },
      { where: { id: req.user.id }, transaction: t }
    );
    await t.commit();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    await t.rollback();
    res.status(500).json({ err: error });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const t = await sequelize.transaction();
    const id = req.params.id;
    const exp = await Expense.findByPk(id);
    if (req.user.id === exp.userId) {
      const result = await exp.destroy({ transaction: t });
      const updatedTotalExpense =
        Number(req.user.totalExpense) - Number(exp.amount);
      User.update(
        { totalExpense: updatedTotalExpense },
        { where: { id: req.user.id }, transaction: t }
      );
      await t.commit();
      res.status(200).json(result);
    }
  } catch (error) {
    await t.rollback();
    res.status(500).json(error);
  }
};
