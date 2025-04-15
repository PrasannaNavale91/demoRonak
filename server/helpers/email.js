const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async ({ to, name, otp}) => {
  try {
    const msg = {
      to,
      from: {
        name: 'Trend Crave',
        email: 'prasanna99navale@gmail.com'
      },
      templateId: process.env.TEMPLATE_ID,
      dynamicTemplateData: {
        name,
        otp,
      }
    };
    
    await sgMail.send(msg);
    console.log(`Email sent successfully ${to}`);
  } catch (error) {
    console.error('Error sending email:', error.response?.body || error.message);
  }
};

module.exports = sendEmail;