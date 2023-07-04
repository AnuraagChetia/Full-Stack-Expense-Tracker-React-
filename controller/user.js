const User = require("../model/user");
exports.signup = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  console.log(name + email + password);
  if (name === "" || email === "" || password === "") {
    throw new Error("Please enter all the fields");
  }
  try {
    const response = await User.create({
      name: name,
      email: email,
      password: password,
    });
    console.log(response);
    res.status(200).json(response);
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

exports.login = (req, res) => {
  console.log(req.body);
};