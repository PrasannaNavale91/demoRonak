const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (to, subject, htmlContent) => {
  try {
    const msg = {
      to,
      from: {
        name: 'Trend Crave',
        email: 'prasanna.navle143@gmail.com'
      },
      templateId: process.env.TEMPLATE_ID,
      dynamicTemplateData: {
        name: 'Jack'
      }
    };
    await sgMail.send(msg);
    console.log(`Email sent successfully ${to}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendEmail;