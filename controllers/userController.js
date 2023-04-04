const asyncHandler = require('express-async-handler')
const User = require('../models/User')

//update user
const updateUser = asyncHandler(async (req, res) => {
    if(req.user.id === req.params.id || req.body.isAdmin){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10); 
                req.body.password= await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return res.status(500).json(err);
            }
        }

        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
        res.status(200).json("Account has been updated")
        } catch (err) {
            return res.status(500).json(err);
        }
    } else{
        return res.status(403).json(" you can update only your account");
    }
});

//delete user
const deleteUser = asyncHandler(async (req, res) => {
    if(req.user.id === req.params.id || req.body.isAdmin){

        try {
            const user = await User.findByIdAndDelete(req.params.id);
                
            
        res.status(200).json("Account has been delete");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else{
        return res.status(403).json(" you can delete only your account");
    }
});

const getMe = asyncHandler(async (req, res) => {
    try{ const userinfo = req.user
    const {password,updatedAt, ...other} = userinfo._doc
        res.status(200).json(other);
    } catch (err){
        res.status(500).json(err);
 } })

 //follow a user
 const follow = asyncHandler(async (req, res) => {
    if (req.user.id !== req.params.id){
        try{
            const user= await User.findById(req.params.id);
            const currentUser = await User.findById(req.user.id);

            if(!user.followers.includes(req.user.id)){
              await user.updateOne({ $push: { followers : req.user.id}});  
              await currentUser.updateOne({ $push: {followings: req.params.id }});
                res.status(200).json("user has beeen followed");
            } else{
                res.status(403).json("you allready follow this user")
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("you can't follow your self");
    }
});
//unfollow user
const unfollow = asyncHandler(async (req, res) => {
    if (req.user.id !==req.params.id){
        try{
            const user= await User.findById(req.params.id);
            const currentUser = await User.findById(req.user.id);

            if(user.followers.includes(req.user.id)){
              await user.updateOne({ $pull: { followers : req.user.id}});  
              await currentUser.updateOne({ $pull: {followings: req.params.id }});
                res.status(200).json("user has beeen unfollowed");
            } else{
                res.status(403).json("you don't follow this user")
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("you can't follow your self");
    }
});

// counnt users for admin
const countallusers = asyncHandler(async (req, res) => {
    const users=await  User.find().countDocuments()
    res.status(200).json(users)
    
    });


    //admin delete user
const admindeleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
  
    if (!user) {
      res.status(400)
      throw new Error('user not found')
    }
  
    await user.remove()
  
    res.status(200).json({ id: req.params.id })
  })
  

module.exports = {
    
    updateUser,
    deleteUser,
    getMe,
    follow,
    unfollow,
    countallusers,
    admindeleteUser
    
  }