const Sequelize = require("sequelize");
const sequelize = new Sequelize('webpedia','root', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;

 // const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'password',
//     port:3306,
//     database:'webpedia'
   
//   });