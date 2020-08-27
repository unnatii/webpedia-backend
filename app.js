const express = require("express");
const app = express();
const cors = require("cors");
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
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    exposedHeaders: ["Content-Length", "X-Foo", "X-Bar"],
  })
);

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
      console.log(`Example app listening at http://localhost:5000`)
    );
  })
  .catch((err) => {
    console.log(err);
  });
