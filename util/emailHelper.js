const nodemailer =require("nodemailer")
const {EMAIL_LOGIN,EMAIL_PASSWORD} = require("../config")


exports.transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_LOGIN,
    pass: EMAIL_PASSWORD
  }
})

exports.getPasswordResetURL = (userid, token) =>{
     //console.log('useremail',process.env.EMAIL_LOGIN);
 return `http://localhost:3000/reset/${userid}/${token}`
}

exports.resetPasswordTemplate = (user, url) => {
  const from = EMAIL_LOGIN
  const to = user.email
  const subject = "Webpedia Password Reset "
  const html = `
  <p>Hey ${user.name || user.email},</p>
  <p>We heard that you lost your password. Sorry about that!</p>
  <p>But don’t worry! You can use the following link to reset your password:</p>
  <a href=${url}>${url}</a>
  <p>If you don’t use this link within 1 hour, it will expire.</p>
 

  `

  return { from, to, subject, html }
}