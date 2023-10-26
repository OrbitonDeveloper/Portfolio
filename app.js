require("dotenv").config();

// routes.js
const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");

const PORT = process.env.PORT || 5000;
const app = express();
const router = require("express").Router();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

app.get("/check-mail-service", (req, res, next) => {
  return res.status(200).json({ Message: "Mail Service Working" });
});

app.post("/mail", (req, res, next) => {
  console.log("mail sending ...");
  var transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    // port: 465,
    // secure: true,
    auth: {
      user: process.env.TO_EMAIL,
      pass: process.env.TO_PASSWORD,
    },
  });

  //make mailable object
  // const mail = {
  //     from: process.env.SMTP_FROM_EMAIL,
  //     to: process.env.TO_EMAIL,
  //     subject: 'New Contact Form Submission',
  //     text: `
  //     from:
  //     ${req.body.name}

  //     contact details
  //     email: ${req.body.email}
  //     phone: ${req.body.tel}

  //     message:
  //     ${req.body.message}`,
  // }

  var mail = {
    from: req.body.email,
    to: process.env.TO_EMAIL,
    subject: `${req.body.subject} from ${req.body.email}`,
    text: req.body.message,
  };

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      console.log("error => ", err);
      return res.status(500).json({ status: "fail", message: err });
    } else {
      console.log("data => ", data);
      return res.status(200).json({ status: "success", message: data });
      //response.sendFile(path.resolve(__dirname, "public", "index.html"));
    }
  });

  console.log("send => ", mail);
  //   return res.status(200).json({ Message: mail });
  return res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

app.use("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "public", "index.html"));
});

app.listen(PORT, function () {
  console.error(`listening on port ${PORT}`);
});
