const sgMail = require('@sendgrid/mail');
require('dotenv').config();
const Otp = require('./models/Otp');


sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async ( to, otp, name = 'User' ) => {
  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await Otp.findOneAndDelete({ email: to });
    await Otp.create({
      email: to,
      otp,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000)
    });

    const msg = {
      to,
      from: {
        name: 'Trend Crave',
        email: 'prasanna99navale@gmail.com'
      },
      templateId: process.env.TEMPLATE_ID,
      dynamicTemplateData: {
        name: 'TrendCrave',
        otp: otp,
      }
    };

    // console.log("Sending email to:", to);
    // console.log("OTP:", otp);
    // console.log("Template ID:", process.env.TEMPLATE_ID);
    
    await sgMail.send(msg);
    console.log(`Email sent successfully ${to}`);
  } catch (error) {
    console.error('Error sending email:', error.response?.body || error.message);
  }
};

module.exports = sendEmail;