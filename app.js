const express = require("express");
const app = express();
const expressSession = require("express-session");
const sequelize = require("./util/database");
const sequelizeSessionStore = require("./models/session");
const authRoutes = require("./routes/authRoutes");
const bodyParser = require("body-parser");
const {
  PORT,
  SESS_NAME,
  SESS_SECRET,
  SESS_LIFETIME,
  NODE_ENV,
} = require("./config");


app.use(bodyParser.json());
app.use(
  expressSession({
    name: SESS_NAME,
    secret: SESS_SECRET,
    saveUninitialized: false,
    resave: false,
    store: sequelizeSessionStore,

    cookie: {
      sameSite: false,
      secure: false,
      maxAge: parseInt(SESS_LIFETIME),
    },
  })
);
app.use("/user", authRoutes);

sequelize
  .sync()
  .then((result) => {
    console.log(result);
    app.listen(PORT, () =>
      console.log(`app listening at http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.log(err);
  });
