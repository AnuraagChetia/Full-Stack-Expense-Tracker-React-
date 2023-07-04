const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./util/database");

const app = express();
app.use(cors());

app.use(bodyParser.json());

const port = 3000;

const userRouter = require("./routes/user");

app.use("/users", userRouter);

sequelize
  .sync()
  .then(() => {
    app.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });
