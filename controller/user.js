const User = require("../model/user");
const bcrypt = require("bcrypt");
exports.signup = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  console.log(name + email + password);
  if (name === "" || email === "" || password === "") {
    throw new Error("Please enter all the fields");
  }
  try {
    bcrypt.hash(password, 10, async (err, hash) => {
      const response = await User.create({
        name: name,
        email: email,
        password: hash,
      });
      res.status(200).json(response);
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      res
        .status(500)
        .json({ "Duplicate entry error": error.errors[0].message });
    } else {
      res.status(500).json({ Error: error.message });
      // console.error("Error:", error.message);
    }
  }
};

exports.login = async (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;
  const response = await User.findOne({ where: { email: email } });
  if (response === null) {
    // console.log("Not found!");
    res.status(404).json({ err: "User not found" });
    return;
  }
  bcrypt.compare(password, response.password, (err, result) => {
    if (result === false)
      return res
        .status(401)
        .json({ success: false, err: "Password do not match" });
    if (err) {
      res.status(401).json({ success: false, err: "Something went wrong" });
      return;
    }
    return res
      .status(200)
      .json({ success: true, message: "Login Successfull" });
  });
};
