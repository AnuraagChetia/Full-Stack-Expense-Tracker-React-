const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./util/database");

const expenses = require("./model/expense");
const user = require("./model/user");

const app = express();
app.use(cors());

app.use(bodyParser.json());

const port = 3000;

const userRouter = require("./routes/user");
const expenseRouter = require("./routes/expense");

user.hasMany(expenses);
expenses.belongsTo(user);

app.use("/users", userRouter);
app.use("/expense", expenseRouter);

sequelize
  .sync()
  .then(() => {
    app.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });
