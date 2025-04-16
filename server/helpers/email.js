const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async ( to, otp, user ) => {
  try {
    const msg = {
      to,
      from: {
        name: 'TrendCrave',
        email: 'prasanna99navale@gmail.com'
      },
      templateId: process.env.TEMPLATE_ID,
      dynamicTemplateData: {
        name: user,
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