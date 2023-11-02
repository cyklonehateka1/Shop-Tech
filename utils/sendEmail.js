const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: "cyklonehateka1@gmail.com",
    pass: "mh5VUMFZvsNC43L2",
  },
  secure: false,
});

const options = {
  viewEngine: {
    extName: ".handlebars",
    partialsDir: "path/to/partials",
    defaultLayout: "main",
  },
  viewPath: "./emailTemplates",
  extName: ".handlebars",
};

const sendEmail = async (receiver, subject, text, html) => {
  try {
    await new Promise((resolve, reject) => {
      // Verify connection configuration
      transporter.verify(function (error, success) {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          console.log("Server is ready to take our messages");
          resolve(success);
        }
      });
    });

    const info = await new Promise((resolve, reject) => {
      // Send the email
      transporter.sendMail(
        {
          from: "cyklonehateka1@gmail.com",
          to: receiver,
          subject,
          text,
          html,
        },
        (err, info) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            console.log(info);
            resolve(info);
          }
        }
      );
    });

    return info;
  } catch (error) {
    console.error(error);
    return error;
  }
};

module.exports = sendEmail;
