const nodemailer = require("nodemailer");

const { EMAIL_USERNAME, EMAIL_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp-mail.outlook.com",
  port: 587,
  secure: false,
  auth: {
    user: EMAIL_USERNAME,
    pass: EMAIL_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

async function sendEmail(data) {
  const email = { ...data, from: EMAIL_USERNAME };
  try {
    await transport.sendMail(email);
    console.log("Email sent successfully");
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}

module.exports = sendEmail;
