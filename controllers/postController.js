const asyncHandler = require('express-async-handler')
const Post= require("../models/Post");
const User= require("../models/User");

const setPost = asyncHandler(async (req, res) => {
    
  
    const post = await Post.create({
      
      user: req.user.id,
      desc: req.body.desc,
      img: req.body.img,
   
  
    })
  
    res.status(200).json(post)
  })

  //update a post
  const updatePost = asyncHandler(async (req, res) => {
    try{
        const post=await Post.findById(req.params.id);
        if (post.user.toString() === req.user.id){
            await post.updateOne({$set:req.body});
            res.status(200).json("updated post");
        } else{
            res.status(403).json("you can update only your post");
        }
    } catch (err){
        res.status(500).json(err);
    }
});

//delete a post
const deletePost = asyncHandler(async (req, res) => {
    try{
        const post=await Post.findById(req.params.id);
        if (post.user.toString() === req.user.id){
            await post.deleteOne();
            res.status(200).json("the post is deleted");
        } else{
            res.status(403).json("you can delete only your post");
        }
    } catch (err){
        res.status(500).json(err);
    }
});
//like post
const likePost = asyncHandler(async (req, res) => {
    try{
        const post= await Post.findById(req.params.id);
        if(!post.likes.includes(req.user.id)){
            await post.updateOne({ $push:{likes: req.user.id }});
            res.status(200).json("the post has been liked");
        } else {
            await post.updateOne({ $pull: { likes: req.user.id}});
            res.status(200).json("the post has been disliked");
        } 

    }catch (err){
        res.status(500).json(err);
    }
});

const timelinePost = asyncHandler(async (req, res) => {
    try {
        const currentUser = await User.findById(req.user.id);
        const userPosts = await Post.find({ user: req.user.id});
        const friendPosts = await Promise.all(
            currentUser.followings.map((friend) => {
                return Post.find({ user: friend });
            })
        );
        res.json(userPosts.concat(...friendPosts))
    } catch (err){
        res.status(500).json(err);
    }
});

const fetchallPosts = asyncHandler(async (req, res) => {
    Post.find((err,val)=>{
     if(err) {
       res.status(500)
     throw new Error('cannot fetch an event')
      
     
     } 
    else {
     res.status(200).json(val)
    }
 {    
 }
   })
 });

 // no of created posts admin

 const countallposts = asyncHandler(async (req, res) => {
    const posts=await  Post.find().countDocuments()
    res.status(200).json(posts)
    
    }); 
// delete by admin
    const admindeletePost = asyncHandler(async (req, res) => {
        const post = await Post.findById(req.params.id)
      
        if (!post) {
          res.status(400)
          throw new Error('post not found')
        }
        await post.remove()
      
        res.status(200).json({ id: req.params.id })
      })


  module.exports = {
    setPost,
    updatePost,
    deletePost,
    likePost,
    timelinePost,
    fetchallPosts,
    countallposts,
    admindeletePost
  }