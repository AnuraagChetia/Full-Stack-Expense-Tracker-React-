const Users = require("../model/user");
const Expense = require("../model/expense");
const sequelize = require("../util/database");

exports.getLeaderboard = async (req, res) => {
  try {
    const leaderboardData = await Users.findAll({
      include: [
        {
          model: Expense,
          attributes: [],
        },
      ],
      attributes: [
        "name",
        [
          sequelize.fn("sum", sequelize.col("transactions.amount")),
          "totalExpense",
        ],
      ],
      group: ["users.id"],
      order: [["totalExpense", "DESC"]],
    });
    res.status(201).json(leaderboardData);
  } catch (error) {
    res.status(500).json(error);
  }
};
