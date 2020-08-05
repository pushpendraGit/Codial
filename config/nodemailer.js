const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
const env = require('./enviroment');

// let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     host: 'smtp.gmail.com',
//     port: 587,
//     secure: false,
//     auth: {
//         user: 'parmarshashank11@gmail.com',
//         password: 'dellinspiron@36'
//     }
// });
let transporter = nodemailer.createTransport(env.smtp)
 

let renderTemplate = (data, relativePath) => {
  let mailHTML;
  ejs.renderFile(
    path.join(__dirname, "../views/mailers", relativePath),
    data,
    function (err, template) {
      if (err) {
        console.log(err);
        return;
      }
      mailHTML = template;
    }
  );
  return mailHTML;
};

module.exports = {
  transporter: transporter,
  renderTemplate: renderTemplate,
};
