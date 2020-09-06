const Sequelize = require("sequelize");
const sequelize = require("../util/database");
const User = require("./user");
const expressSession = require("express-session");
var SessionStore = require("connect-session-sequelize")(expressSession.Store);
const Session = sequelize.define("Session", {
  sid: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  expires: Sequelize.DATE,
  data: Sequelize.TEXT,
  userId: Sequelize.STRING,
});

function extendDefaultFields(defaults, session) {
  return {
    data: defaults.data,
    expires: defaults.expires,
    userId: session.user.userId,
  };
}

const sequelizeSessionStore = new SessionStore({
  db: sequelize,
  table: "Session",
  extendDefaultFields: extendDefaultFields,
});

module.exports = sequelizeSessionStore;
