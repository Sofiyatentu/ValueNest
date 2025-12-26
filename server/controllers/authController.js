const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.SECRET_KEY || "SECRET_KEY";

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
    const demoEnvSet =
      process.env.DEMO_ADMIN_EMAIL && process.env.DEMO_ADMIN_PASSWORD;
    if (
      demoEnvSet &&
      email === process.env.DEMO_ADMIN_EMAIL &&
      password === process.env.DEMO_ADMIN_PASSWORD
    ) {
      let demoUser = await User.findOne({ email });
      if (!demoUser) {
        const hashedPassword = await bcrypt.hash(password, 10);

        demoUser = new User({
          userName: "Demo Admin",
          email,
          password: hashedPassword,
          role: "admin",
          isDemo: true,
        });
        await demoUser.save();
      }
      const token = jwt.sign(
        {
          id: demoUser._id,
          role: demoUser.role,
          email: demoUser.email,
          userName: demoUser.userName,
          isDemo: true,
        },
        JWT_SECRET,
        { expiresIn: "60m" }
      );
      return res.status(200).json({
        success: true,
        message: "Logged in (demo) successfully",
        token,
        user: {
          email: demoUser.email,
          id: demoUser._id,
          role: demoUser.role,
          userName: demoUser.userName,
          isDemo: true,
        },
      });
    }

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
        isDemo: existingUser.isDemo || false,
      },
      JWT_SECRET,
      { expiresIn: "60m" }
    );
    // res.cookie("token", token, { httpOnly: true, secure: true }).json({
    //   success: true,
    //   message: "Logged in successfully",
    //   user: {
    //     email: existingUser.email,
    //     id: existingUser._id,
    //     role: existingUser.role,
    //     userName: existingUser.userName,
    //   },
    // });
    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token,
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

// const authMiddleware = async (req, res, next) => {
//   const token = req.cookies.token;
//   if (!token)
//     return res.status(401).json({
//       succes: false,
//       message: "Unauthorised user",
//     });

//   try {
//     const decoded = jwt.verify(token, "SECRET_KEY");
//     req.user = decoded;
//     next();
//   } catch (e) {
//     res.status(401).json({
//       succes: false,
//       message: "Unauthorised user",
//     });
//   }
// };

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];
  if (!token)
    return res.status(401).json({
      succes: false,
      message: "Unauthorised user",
    });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded.role === "demo-admin") {
      decoded.role = "admin";
      decoded.isDemo = true;
    }
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
