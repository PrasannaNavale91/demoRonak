const { Resend } = require('resend');
require("dotenv").config();
const resend = new Resend(process.env.RESEND_API_KEY);

const sendOTP = async (email, otp) => {
  try {
    await resend.emails.send({
      from: 'TrendCrave <support@trendcrave.it.com>',
      to: [email],
      subject: 'Your OTP Code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
          <img src="https://res.cloudinary.com/jackiieee/image/upload/v1747199401/icon-192x192_c5cnz1.png" alt="Logo" width="100" height="100"/>
          <h2 style="color:rgb(29, 29, 29); text-align: center;">Verification Code</h2>
          <p style="font-size: 16px; color: #333;">Dear User,</p>
          <p style="font-size: 16px; color: #333;">Your verification code is:</p>
          <div style="text-align: center; margin: 20px 0;">
            <span style="display: inline-block; font-size: 24px; font-weight: bold; color:rgb(105, 105, 105); padding: 10px 20px; border: 1px solid #4CAF50; border-radius: 5px; background-color: #e8f5e9;">
              ${otp}
            </span>
          </div>
          <p style="font-size: 16px; color: #333;">Please use this code to verify your email address. The code will expire in 10 minutes.</p>
          <p style="font-size: 16px; color: #333;">If you did not request this, please ignore this email.</p>
          <footer style="margin-top: 20px; text-align: center; font-size: 14px; color: #999;">
            <p>Thank you,<br>TrendCrave Team</p>
            <p style="font-size: 12px; color: #aaa;">This is an automated message. Please do not reply to this email.</p>
          </footer>
        </div>
      `
    });
    console.log("OTP email sent");
    return true;
  } catch (error) {
    console.error("Error sending OTP email:", error);
    return false;
  }
};

const sendEmail = async (email, username, html) => {
  try {
    await resend.emails.send({
      from: 'TrendCrave <support@trendcrave.it.com>',
      to: [email],
      subject: 'Welcome to our stored',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
          <img src="https://res.cloudinary.com/jackiieee/image/upload/v1747199401/icon-192x192_c5cnz1.png" alt="Logo" width="100" height="100"/>
          <h2 style="color:rgb(29, 29, 29); text-align: center;">Welcome to Store</h2>
          <p style="font-size: 16px; color: #333;">Dear ${username},</p>
          <p style="font-size: 16px; color: #333;">Thank you for shopping with us also do check out new arrivals on our store.</p>
          <p style="font-size: 16px; color: #333;">Also do checkout for brand new seasonal products.</p>
          <p style="font-size: 16px; color: #333;">We have offer for newly registered users <span style="display: inline-block; font-size: 24px; font-weight: bold; color:rgb(105, 105, 105); padding: 10px 20px; border: 1px solidrgb(101, 128, 202); border-radius: 5px; background-color: #e8f5e9;">
            flat 10%</span> off on top-wears.</p>
          <footer style="margin-top: 20px; text-align: center; font-size: 14px; color: #999;">
            <p>Thank you,<br>TrendCrave Team</p>
            <p style="font-size: 12px; color: #aaa;">This is an automated message. Please do not reply to this email.</p>
          </footer>
        </div>`,
    });
    console.log("Email sent");
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

const sendOrdermail = async (email, subject, html) => {
  try {
    await resend.emails.send({
      from: 'TrendCrave <support@trendcrave.it.com>',
      to: [email],
      subject: 'Your order has confirmed',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
          <img src="https://res.cloudinary.com/jackiieee/image/upload/v1747199401/icon-192x192_c5cnz1.png" alt="Logo" width="100" height="100"/>
          <h2 style="color:rgb(29, 29, 29); text-align: center;">Order Confirmed</h2>
          <p style="font-size: 16px; color: #333;">Dear User,</p>
          <p style="font-size: 16px; color: #333;">Thank you for shopping with us also do check out new arrivals on our store.</p>
          <div style="text-align: center; margin: 20px 0;">
            <span style="display: inline-block; font-size: 24px; font-weight: bold; color:rgb(105, 105, 105); padding: 10px 20px; border: 1px solidrgb(101, 128, 202); border-radius: 5px; background-color: #e8f5e9;">
              ${orderId}
            </span>
          </div>
          <p style="font-size: 16px; color: #333;">Please use this code to verify your email address. The code will expire in 10 minutes.</p>
          <p style="font-size: 16px; color: #333;">If you did not request this, please ignore this email.</p>
          <footer style="margin-top: 20px; text-align: center; font-size: 14px; color: #999;">
            <p>Thank you,<br>TrendCrave Team</p>
            <p style="font-size: 12px; color: #aaa;">This is an automated message. Please do not reply to this email.</p>
          </footer>
        </div>`,
    });
    console.log("Email sent");
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

module.exports = {
  sendOTP,
  sendEmail,
  sendOrdermail
};