const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const sendEmail = require("../../helpers/email");

require("dotenv").config();

//register
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    
    if (checkUser)
      return res.json({
        success: false,
        message: "User Already exists with the same email! Please try again",
      });

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });

    await newUser.save();

    const welcomeMessage = `
      <h2>Welcome to Our Store, ${userName}!</h2>
      <p>Thank you for registering with us. Stay tuned for exciting offers!</p>
      <br>
      <p>Best regards,</p>
      <p>The Trend Crave Team</p>
    `;
    await sendEmail(email, 'Congratulation! Shop now on lowest pricing', welcomeMessage);
    res.status(200).json({
      success: true,
      message: "Registration successful",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "An error occurred during registration.",
    });
  }
};

//login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser)
      return res.json({
        success: false,
        message: "User doesn't exists! Please register first",
      });

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );
    if (!checkPasswordMatch)
      return res.json({
        success: false,
        message: "Incorrect password! Please try again",
      });

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
      },
      process.env.JWT_TOKEN,
      { expiresIn: "60m" }
    );

    res.cookie("token", token, { httpOnly: true, secure: true, sameSite }).json({
      success: true,
      message: "Logged in successfully",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        userName: checkUser.userName,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

//logout
const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully!",
  });
};

//subscribers
const subscribeUser = async (req, res) => {
  const { email } = req.body;
  try {
    const subscriptionMessage = `
      <h2>Thank You for Subscribing!</h2>
      <p>We'll keep you updated with the latest offers and news.</p>
      <br>
      <p>Best regards,</p>
      <p>The Trend Crave Team</p>
    `;
    await sendEmail(email, 'Greate!Our new year collection is now available', subscriptionMessage);

    res.status(200).json({
      success: true,
      message: "Subscribe successfully..!",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
}

//auth middleware
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token){
      return res.status(401).json({
        success: false,
        message: "Unauthorised user!",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });
  }
};

module.exports = { registerUser, loginUser, logoutUser, authMiddleware, subscribeUser };