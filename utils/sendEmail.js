const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: "cyklonehateka1@gmail.com",
    pass: "mh5VUMFZvsNC43L2",
  },
  secure:true
});

const sendEmail = async (reciever, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: "cyklonehateka1@gmail.com",
      to: reciever,
      subject,
      text,
      html,
    });
    return "email sent";
  } catch (err) {
    return err;
  }
};

module.exports = sendEmail;
