const express = require('express');
const app = express();
const expressSession=require('express-session');
const sequelize=require('./util/database')
const equelizeSessionStore=require('./models/session')
const authRoutes=require('./routes/authRoutes')
const {PORT,SESS_NAME, SESS_SECRET, SESS_LIFETIME,NODE_ENV}=require('./config')
const bodyParser = require("body-parser");
app.use(bodyParser.json());


app.use(expressSession({
  name: SESS_NAME,
  secret: SESS_SECRET,
  saveUninitialized: false,
  resave: false,
  store: equelizeSessionStore,
  
  cookie: {
    sameSite: true,
    secure: NODE_ENV === 'production',
    maxAge: parseInt(SESS_LIFETIME)
  }
}));
app.use('/user', authRoutes);



sequelize
  .sync()
  .then((result) => {
    console.log(result);
    app.listen(PORT, () =>
      console.log(`Example app listening at http://localhost:5000`)
    );
  })
  .catch((err) => {
    console.log(err);
  });


