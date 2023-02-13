const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      host: "smtp.gmail.com",
      secure: false,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });
    transporter.use(
      "compile",
      hbs({
        viewEngine: {
          extName: ".handlebars",
          partialsDir: "./views",
          defaultLayout: false,
        },
        viewPath: "./views",
        extName: ".handlebars",
      })
    );
    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject,
      template: "verifyEmail",
      context: {
        token: text,
      },
    });
    return "email sent";
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = sendEmail;
