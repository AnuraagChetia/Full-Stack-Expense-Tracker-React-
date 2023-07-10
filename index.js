const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./util/database");

const expenses = require("./model/expense");
const user = require("./model/user");
const order = require("./model/order");
const forgetPasswordRequests = require("./model/forgetPasswordRequests");

const app = express();
app.use(cors());

app.use(bodyParser.json());

const port = 3000;

const userRouter = require("./routes/user");
const expenseRouter = require("./routes/expense");
const orderRouter = require("./routes/order");
const leaderBoardRouter = require("./routes/leaderboard");
const passwordRouter = require("./routes/password");

//Relations
user.hasMany(expenses);
expenses.belongsTo(user);

user.hasMany(order);
order.belongsTo(user);

user.hasMany(forgetPasswordRequests);
forgetPasswordRequests.belongsTo(user);

//Routes
app.use("/users", userRouter);
app.use("/expense", expenseRouter);
app.use("/order", orderRouter);
app.use("/leaderboard", leaderBoardRouter);
app.use("/password", passwordRouter);

sequelize
  .sync()
  .then(() => {
    app.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });
