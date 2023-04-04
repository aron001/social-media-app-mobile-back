const Quation= require("../models/Quation");
const asyncHandler = require('express-async-handler')
const Answer= require("../models/Answer");

const setAnswer = asyncHandler(async (req, res) => {
    const quation = await Quation.findById(req.params.id)

    if (!quation) {
      res.status(400)
      throw new Error('quation not found')
    }
    const answer = await Answer.create({
      
      user: req.user.id,
      quation: req.params.id,
      answerdesc: req.body.answerdesc,
      img:req.body.img
      
    })
  
    res.status(200).json({
        user: answer.user,
        quation: answer.quation,
        answerdesc: answer.answerdesc,
        img:answer.img
        
      })
  })

  const getAnswer = asyncHandler(async (req, res) => {
    await Answer.find({quation:req.params.id})
    .populate({path:'user',select:['username']})
    .exec()
    .then((answers)=>
    {
      res.json(answers);
    }, (err)=>{
      res.send(err);
    })
  });

  const likeAnswer = asyncHandler(async (req, res) => {
    try{
        const answer= await Answer.findById(req.params.id);
        if(!answer.likes.includes(req.user.id)){
            await answer.updateOne({ $push:{likes: req.user.id }});
            res.status(200).json("the answer has been liked");
        } else {
            await answer.updateOne({ $pull: { likes: req.user.id}});
            res.status(200).json("the answer has been disliked");
        } 

    }catch (err){
        res.status(500).json(err);
    }
});

const updateAnswer = asyncHandler(async (req, res) => {
    try{
        const answer=await Answer.findById(req.params.id);
        if (answer.user.toString() === req.user.id){
            await answer.updateOne({$set:req.body});
            res.status(200).json("updated answer");
        } else{
            res.status(403).json("you can update only your answer");
        }
    } catch (err){
        res.status(500).json(err);
    }
});

const deleteAnswer = asyncHandler(async (req, res) => {
    try{
        const answer=await Answer.findById(req.params.id);
        if (answer.user.toString() === req.user.id){
            await answer.deleteOne();
            res.status(200).json("the answer is deleted");
        } else{
            res.status(403).json("you can delete only your answer");
        }
    } catch (err){
        res.status(500).json(err);
    }
});


module.exports = {
    setAnswer,
    updateAnswer,
    deleteAnswer,
    likeAnswer,
    getAnswer
  }