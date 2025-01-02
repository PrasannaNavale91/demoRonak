const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_KEY);

const sendEmail = async (to, subject, htmlContent) => {
  try {
    const msg = {
      to,
      from: 'prasanna.navle143@gmail.com',
      subject,
      html: htmlContent,
    };
    await sgMail.send(msg);
    console.log(`Email sent successfully ${to}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendEmail;