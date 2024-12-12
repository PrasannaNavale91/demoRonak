const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id: "ATK5P7vGil-8a9arD3-ul7hawy86EXJAXs-0QjLTpUJ1IQMsNHP6Tq0SUjNKK3tOglN9mw5xg8SNJpFE",
  client_secret: "EKDFKVvyDMxbQPpTfzg1fEAr3QGdC9VV7lD93GLAQ0YuFR3E5ksn-qi3UOEN47He2a5yj7xOD1axDlPr",
});

module.exports = paypal;