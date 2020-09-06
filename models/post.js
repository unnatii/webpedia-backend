const Sequelize=require("sequelize");
const sequelize=require("../util/database");
const User=require('./user')
const Post=sequelize.define('Post',{
    post_id:{
       type: Sequelize.STRING,
       primaryKey:true,
       allowNull:false,
       
    },
    title:{
        type:Sequelize.STRING,
        allowNull:false
    },
    tag:{
        type:Sequelize.STRING,
    },
    date:
    { type: Sequelize.DATE,
     defaultValue: Sequelize.NOW 
    },
    votes:{
        type:Sequelize.INTEGER
    },

});

User.hasMany(Post);

module.exports = Post;  