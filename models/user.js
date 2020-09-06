const Sequelize=require("sequelize");
const sequelize=require("../util/database");

const User=sequelize.define('User',{
    Userid:{
       type: Sequelize.STRING,
       primaryKey:true,
       allowNull:false,
       
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    email:{
       type: Sequelize.STRING,
       allowNull:false
    },
    password:{
        type: Sequelize.STRING,
        allowNull:false
     },
    description:{
       type: Sequelize.STRING
    },
    date:
    { type: Sequelize.DATE,
     defaultValue: Sequelize.NOW 
    },
    score:
    { type:Sequelize.INTEGER
    }

});
module.exports = User;  