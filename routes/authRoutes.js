const express = require('express');
const userRoutes = express.Router();
const authcontroller=require('../controllers/auth')


userRoutes.post("/signup",authcontroller.signup );
userRoutes.post("/signin",authcontroller.signin );
userRoutes.delete("/signout",authcontroller.signout );
userRoutes.get("",authcontroller.isLoggedIn);
module.exports=userRoutes;