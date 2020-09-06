const Sequelize=require("sequelize");
const sequelize=require("../util/database");
const User=require('./user')
const Post=require('./post')
const Bookmark=sequelize.define('Bookmark',{
    bk_id:{
       type: Sequelize.STRING,
       primaryKey:true,
       allowNull:false,
       
    }
});

User.hasMany(Bookmark);
Bookmark.belongsTo(Post);

module.exports = Bookmark;  