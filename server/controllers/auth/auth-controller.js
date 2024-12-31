const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const sendEmail = require("../../middleware/Email");

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
    res.status(200).json({
      success: true,
      message: "Registration successful",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
  
  // Send welcome email
  const welcomeMessage = `
    <h1>Welcome to Our Store, ${userName}!</h1>
    <p>Thank you for registering with us. Stay tuned for exciting offers!</p>
    <br>
    <p>Best,</p>
    <h3>The Trend Crave Team</h3>
    <br>
    <small>Your are receiving this mail as you opted in to alerts for new fashion arrivals. If you are no longer interested you cab unsubscribe or yoy can update your account settings.</small>
  `;
  await sendEmail(email, 'Welcome to Our Store!', welcomeMessage);

  res.status(201).json({ message: 'User registered and email sent.' });
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
      "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    );

    res.cookie("token", token, { httpOnly: true, secure: false }).json({
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

const subscribeUser = async (req, res) => {
  const { email } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res.json({
        success: false,
        message: "User Already exists with the same email! Please try again",
      });

    const newUser = new User({
      email,
    });

    await newUser.save();
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
  // Send subscription confirmation email
  const subscriptionMessage = `
    <h1>Thank You for Subscribing!</h1>
    <p>We'll keep you updated with the latest offers and news.</p>
    <br>
    <p>Best,</p>
    <h3>The Trend Crave Team</h3>
    <br>
    <small>Your are receiving this mail as you opted in to alerts for new fashion arrivals. If you are no longer interested you cab unsubscribe or yoy can update your account settings.</small>
  `;
  await sendEmail(email, 'Thanks for Subscribing!', subscriptionMessage);

  res.status(200).json({ message: 'Subscription confirmed and email sent.' });
}

//auth middleware
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });

  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });
  }
};

module.exports = { registerUser, loginUser, logoutUser, authMiddleware, subscribeUser };