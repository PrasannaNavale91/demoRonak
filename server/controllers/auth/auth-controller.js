const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const Otp = require("../../models/Otp");
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
      { expiresIn: "30m" }
    );

    res.cookie("token", token, { httpOnly: true, secure: true, sameSite: 'none' }).json({
      success: true,
      message: "Logged in successfully",
      token,
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

//forgot password, verify OTP, reset password
const sendOtp = async (req, res) => {
  const { email } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await Otp.deleteMany({ email });
    const newOtp = new Otp({
      email,
      otp,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000)
    });
    
    await newOtp.save();
    await sendEmail(email, otp, user.name);
    
    res.status(200).json({
      success: true,
      message: "OTP sent to email successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error sending OTP"
    });
  }
}

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const otpRecord = await Otp.findOne({ email, otp: String(otp) });

    if (!otpRecord || otpRecord.expiresAt < new Date()) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP or expired OTP"
      })
    };
    
    await Otp.deleteOne({ email });

    const token = jwt.sign({ email }, process.env.JWT_RESET_TOKEN, { expiresIn: "10m" });
    res.json({
      success: true,
      message: "OTP verified",
      token,
      email
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error verifying OTP",
      error
    });
  }
}

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    console.log("Received token:", token);
    const decoded = jwt.verify(token, process.env.JWT_RESET_TOKEN);
    console.log("Decoded token:", decoded);

    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    console.log("Password reset successful");
    res.json({
      success: true,
      message: "Password reset successfully"
    });
  } catch (error) {
    console.error("Error message:", error.message);
    res.status(500).json({
      message: "Error resetting password",
      error
    });
  }
}

//auth middleware
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  
  if (!token){
    return res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });
  }
};

module.exports = { registerUser, loginUser, logoutUser, authMiddleware, sendOtp, verifyOtp, resetPassword };