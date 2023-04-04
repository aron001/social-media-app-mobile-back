const asyncHandler = require('express-async-handler')
const Quation= require("../models/Quation");
const User= require("../models/User");

const setQuation = asyncHandler(async (req, res) => {
    
  
    const quation = await Quation.create({
      
      user: req.user.id,
      quationdesc: req.body.quationdesc,
      img:req.body.img
      
  
    })
  
    res.status(200).json(quation)
  })

  //update a post
  const updateQuation = asyncHandler(async (req, res) => {
    try{
        const quation=await Quation.findById(req.params.id);
        if (quation.user.toString() === req.user.id){
            await quation.updateOne({$set:req.body});
            res.status(200).json("updated quation");
        } else{
            res.status(403).json("you can update only your quation");
        }
    } catch (err){
        res.status(500).json(err);
    }
});

const deleteQuation = asyncHandler(async (req, res) => {
    try{
        const quation=await Quation.findById(req.params.id);
        if (quation.user.toString() === req.user.id){
            await quation.deleteOne();
            res.status(200).json("the quation is deleted");
        } else{
            res.status(403).json("you can delete only your quation");
        }
    } catch (err){
        res.status(500).json(err);
    }
});

const fetchallQuation = asyncHandler(async (req, res) => {
    Quation.find((err,val)=>{
     if(err) {
       res.status(500)
     throw new Error('cannot fetch a quation')
      
     
     } 
    else {
     res.status(200).json(val)
    }
 {    
 }
   })
 });
// count quations admin
 const countallquations = asyncHandler(async (req, res) => {
    const quations= await Quation.find().countDocuments()
    res.status(200).json(quations)
    
    }); 
//delete by admin
    const admindeleteQuation = asyncHandler(async (req, res) => {
        const quation = await Quation.findById(req.params.id)
      
        if (!quation) {
          res.status(400)
          throw new Error('quation not found')
        }
        await post.remove()
      
        res.status(200).json({ id: req.params.id })
      })
 module.exports = {
    setQuation,
    updateQuation,
    deleteQuation,
    fetchallQuation,
    countallquations,
    admindeleteQuation
  }