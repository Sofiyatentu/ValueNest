const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.json({ success: false, message: "User already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ userName, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Registration failed",
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.json({ success: false, message: "User doesnot exist" });
    const matchPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchPassword)
      return res.json({ success: false, message: "Incorrect Password" });
    const token = jwt.sign(
      {
        id: existingUser._id,
        role: existingUser.role,
        email: existingUser.email,
        userName: existingUser.userName,
      },
      "SECRET_KEY",
      { expiresIn: "60m" }
    );
    res.cookie("token", token, { httpOnly: true, secure: true }).json({
      success: true,
      message: "Logged in successfully",
      user: {
        email: existingUser.email,
        id: existingUser._id,
        role: existingUser.role,
        userName: existingUser.userName,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};

const logoutUser = async (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully",
  });
};

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      succes: false,
      message: "Unauthorised user",
    });

  try {
    const decoded = jwt.verify(token, "SECRET_KEY");
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({
      succes: false,
      message: "Unauthorised user",
    });
  }
};
module.exports = { registerUser, loginUser, logoutUser, authMiddleware };
