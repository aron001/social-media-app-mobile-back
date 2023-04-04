const express = require('express')
const router = express.Router()
const {
 
  updateUser,
  deleteUser,
  getMe,
  follow,
  unfollow,
  countallusers,
  admindeleteUser
} = require('../controllers/userController')

const { protect ,isAdmin} = require('../middleware/authMiddleware')


router.put('/updateuser/:id', protect, updateUser)
router.delete('/deleteuser/:id',protect, deleteUser)
router.get('/me', protect, getMe)
router.put('/:id/follow',protect,follow)
router.put('/:id/unfollow',protect,unfollow)
router.get('/countusers', protect,isAdmin,countallusers )
router.delete('/admindeleteuser/:id',protect,isAdmin,admindeleteUser)
module.exports = router













/*const router=require("express").Router();
const User= require("../models/User");
const bcrypt= require("bcrypt");

//update user
router.put("/:id", async (req, res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
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
router.delete("/:id", async (req, res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){

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

//get a user
router.get("/:id", async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        const {password,updatedAt, ...other} = user._doc
        res.status(200).json(other);
    } catch(err){
        res.status(500).json(err);
    }
});

//follow a user
router.put("/:id/follow", async (req,res)=>{
    if (req.body.userId !== req.params.id){
        try{
            const user= await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);

            if(!user.followers.includes(req.body.userId)){
              await user.updateOne({ $push: { followers : req.body.userId}});  
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
router.put("/:id/unfollow", async (req,res)=>{
    if (req.body.userId !==req.params.id){
        try{
            const user= await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);

            if(user.followers.includes(req.body.userId)){
              await user.updateOne({ $pull: { followers : req.body.userId}});  
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

module.exports =router
*/