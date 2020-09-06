const express = require('express');
const postRoutes = express.Router();
const postController=require('../controllers/post');


postRoutes.post("/new",postController.submitQues)
postRoutes.get("/all",postController.getAllPosts)
postRoutes.get("/:tag",postController.getAllPostsTagwise)
module.exports=postRoutes;