const Sequelize = require("sequelize");
const sequelize = new Sequelize('webpedia','root', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
