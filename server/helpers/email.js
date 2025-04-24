const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const sendOTP = async (email, otp) => {
  try {
    await resend.emails.send({
      from: 'TrendCrave <support@trendcrave.it.com>',
      to: [email],
      subject: 'Your OTP Code',
      html: `
        <h2>Here is your OTP</h2>
        <p><strong>${otp}</strong></p>
        <p>This OTP is valid for 2 minutes.</p>
      `
    });
    console.log("OTP email sent");
    return true;
  } catch (error) {
    console.error("Error sending OTP email:", error);
    return false;
  }
};

const sendEmail = async (to, subject, html) => {
  try {
    await resend.emails.send({
      from: 'TrendCrave <support@trendcrave.it.com>',
      to: [to],
      subject: 'Welcome to Our Store',
      html: `
          <div>
            <h2>Welcome to Our Platform</h2>
            <p>We're excited to have you on board!</p>
          </div>`
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
};