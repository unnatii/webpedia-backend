const User =require('../models/user')
const Session =require('../models/session')
const Post=require('../models/post')
const { v4: uuidv4 } = require('uuid');

exports.submitQues = (req, res, next) => {
    console.log(req.session)
    if(req.body.ques){
        const post=new Post({
            post_id:uuidv4(),
            title:req.body.ques,
            tag:req.body.tag,
            votes:0,
            Userid:req.session.user.userid
        })
        return post.save();
    }else{
        console.log("post not created!")
    }

}

exports.getAllPosts=  (req,res,next)=>{
    Post.findAll()
    .then((posts)=>res.send(posts))
    .catch((err)=>console.log(err))
}

exports.getAllPostsTagwise=  (req,res,next)=>{
    Post.findAll({
        where:{tag:req.params.tag}
    })
    .then((posts)=>res.send(posts))
    .catch((err)=>console.log(err))
}