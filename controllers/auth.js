const User =require('../models/user')
const Session =require('../models/session')
const bcrypt=require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const sessionizeUser=require('../util/helper')

exports.signup = (req, res, next) => {
   const { name,email, password } = req.body.user;
   User.findOne({
     where: { email: email },
   }).then(userInfo=>{
     console.log("ui",userInfo);
     if(userInfo){
       console.log("email already registered!")
       return res.send("emailError")
     }
     bcrypt
     .hash(password, 12)
     .then((hasPwd) => {
       const user = new User({
         Userid:uuidv4(),
         email: email,
         password: hasPwd,
         name: name
       });
       return user.save();
     })
     .then((result) => {
       res.status(201).json({
         message: "User Created"
       });
     })
     .catch((err) => {
       if (!err.statusCode) {
         err.statusCode = 500;
       }
       next(err);
     });
   }).catch((err) => {console.log(err)})
 };
  
   


exports.signin = async (req, res) => {
console.log(req.body);
  try {
    const { email, password } = req.body.user  
    const user = await User.findOne({
      where: { email: email },
    });
  if(user){
    bcrypt.compare(password, user.password, function(err, result) {
      if(result){
        const sessionUser = sessionizeUser(user);
        req.session.user = sessionUser
        console.log(req.session);
        res.send(sessionUser);
      }else{
        res.status(200).json({
          message:'wrong password'
        });
      }
  });
}else{
  res.status(200).json({
    message:'User not found'
  });
}
  } catch (err) {
    res.status(401).send(err);
  }
}
  
  
  
  exports.signout = ({session}, res, next) => {
    try {
        const user = session.user;
        if (user) {
         Session.destroy({
           where:{
             email:user.email
           }
         })
          session.destroy(err => {
            if (err) throw (err);
            res.clearCookie(SESS_NAME);
            res.send(user);
          });
        } else {
          throw new Error('Something went wrong');
        }
      } catch (err) {
        res.status(422).send(parseError(err));
      }
 
  }

  exports.isLoggedIn=({ session: { user }}, res)=>{
    res.send({ user });
  }