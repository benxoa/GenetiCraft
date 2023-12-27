const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "aq23416@gmail.com",
    pass: "hfhp zikc iffw ewxj",
  },
});

module.exports = transporter