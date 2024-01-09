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

    let token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    res
      .cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      })
      .status(200)
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

    let token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    res
      .cookie("token", token, {
        httpOnly: false,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      })
      .status(200)
      .json({ success: true, message: "User Logged In Successfully!" });
  } else {
    res.json({ success: false, message: "Invalid Credentials" });
  }
};

const logout = async (req, res) => {
  res.cookie("token", "").json({ success: true, message: "Logout Successful" });
};

const checkUser = async (req, res) => {
  const id = req.message.id;
  const findUser = await User.findOne({ id });

  if (!findUser) {
    res.json({ success: false, message: "Login First" });
  }

  res.json({ success: true, message: "User Verified" });
};

const getUser = async (req, res) => {
  const userId = req.id;
  let user;
  try {
    user = await User.findById(userId, "-password");
  } catch (error) {
    console.log(error.message);
  }

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json({ success: true, message: user });
};

module.exports = { signup, login, logout, checkUser, getUser };
