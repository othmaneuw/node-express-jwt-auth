const User = require("../models/User");

// handle errors
const handleErrors = (err) => {
  //console.log(err.message);
  const errors = { email: "", password: "" };
  //console.log(err.code);
  if (err.code === 11000) {
    errors.email = "Email already exists";
    return errors;
  }
  Object.values(err.errors).forEach(({ properties }) => {
    errors[properties.path] = properties.message;
  });
  return errors;
};

const signup_get = (req, res) => {
  res.render("signup");
};

const signup_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    res.status(201).json(user);
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json(errors);
  }
};

const login_get = (req, res) => {
  res.render("login");
};

const login_post = (req, res) => {
  res.send("login post");
};

module.exports = {
  signup_get,
  signup_post,
  login_get,
  login_post,
};
