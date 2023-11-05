const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");

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
  },
  viewPath: "/emailTemplates",
  extName: ".handlebars",
};

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

const sendEmail = async (receiver, subject, text) => {
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
          template: "verifyEmailTemplate",
          subject,
          context: {
            token: text,
          },
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

const recieveCouponEmail = async (receiver, subject, text) => {
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
          template: "receiveCoupon",
          subject,
          context: {
            couponCode: text,
            heading: subject,
          },
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
//
module.exports = {
  sendEmail,
  recieveCouponEmail,
};
