const crypto = require("crypto");
const User = require("../models/user");
const Session = require("../models/session");
const bcrypt = require("bcryptjs");
const emailhelper = require("../util/emailHelper");

exports.sendPasswordResetEmail = (req, res) => {
  const { email } = req.body;
  User.findOne({
    where: { email: email },
  })
    .then((user) => {
   
      if (user) {
        token = crypto.randomBytes(32).toString("hex");
        const url = emailhelper.getPasswordResetURL(user.Userid, token);
        const emailTemplate = emailhelper.resetPasswordTemplate(user, url);
        const sendEmail = () => {
          emailhelper.transporter.sendMail(emailTemplate, (err, info) => {
            if (err) {
              res.status(500).json("Error sending email");
              console.log(`** Email not sent **`, err);
            } else {
              res.send("sent!");
            }
          });
        };
        sendEmail();
      } else {
        res.send("no user with this email");
      }
    })
    .catch((err) => console.log(err));
};

exports.receiveNewPassword = (req, res) => {
  const { password, userId, token } = req.body;

  User.findOne({ where: { Userid: userId } })
    .then((user) => {
      if (user) {
        bcrypt.genSalt(10, function (err, salt) {
          //TODO Call error-handling middleware:
          if (err) return;
          bcrypt.hash(password, salt, function (err, hash) {
            //TODO Call error-handling middleware:
            if (err) return;
            User.findOne({ Userid: userId })
              .then((user) => user.update({ password: hash }))
              .then(() => res.status(202).json("Password changed accepted"))
              .catch((err) => res.status(500).json(err));
          });
        });
      } else {
        console.log("user not found!");
        return;
      }
    })
    // highlight-end
    .catch(() => {
      res.status(404).json("Invalid user");
    });
};
