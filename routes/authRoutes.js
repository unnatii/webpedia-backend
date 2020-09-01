const express = require('express');
const userRoutes = express.Router();
const authController=require('../controllers/auth')
const passController=require('../controllers/passwordRecovery')

userRoutes.post("/signup",authController.signup );
userRoutes.post("/signin",authController.signin );
userRoutes.delete("/signout",authController.signout );
userRoutes.get("",authController.isLoggedIn);
userRoutes.post("/forgotPassword",passController.sendPasswordResetEmail);
userRoutes.post("/resetPassword",passController.receiveNewPassword);
module.exports=userRoutes;