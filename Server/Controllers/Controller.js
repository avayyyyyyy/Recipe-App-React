const User = require("../Models/Usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.findOne({ email, username });
    if (user !== null) {
      res.json({ success: false, message: "User Already Exists" });
      return;
    }
    const hashedPass = await bcrypt.hash(password, 10);
    const Inserted = await new User({
      username,
      email,
      password: hashedPass,
    });
    await Inserted.save();

    let id = await Inserted._id;

    let token = jwt.sign({ id, email }, process.env.JWT_SECRET_KEY);
    res
      .cookie("token", token)
      .json({ success: true, message: "User Successfully Created!" });
  } catch (error) {
    res.json({
      success: false,
      message: "Invalid Credentials",
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user === null) {
    res.json({ success: false, message: "User Not Found, Singup First" });
    return;
  }

  const comparedPass = await bcrypt.compare(password, user.password);

  if (comparedPass) {
    let id = await user._id;

    let token = jwt.sign({ id, email }, process.env.JWT_SECRET_KEY);
    res
      .cookie("token", token)
      .json({ success: true, message: "User Successfully Created!" });
  } else {
    res.json({ success: false, message: "Invalid Credentials" });
  }
};

module.exports = { signup, login };
