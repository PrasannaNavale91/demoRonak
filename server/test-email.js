const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: 'your@email.com', // replace with your email
  from: 'support@trendcrave.com', // your authenticated sender
  subject: 'Integration Test Email ✔️',
  text: 'This is a test email from the TrendCrave backend!',
  html: '<strong>This is a test email from the TrendCrave backend!</strong>',
};

sgMail
  .send(msg)
  .then(() => {
    console.log('✅ Test email sent successfully');
  })
  .catch((error) => {
    console.error('❌ Failed to send test email:', error.response.body);
  });
