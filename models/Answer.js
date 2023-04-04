const mongoose = require ("mongoose");

const AnswerSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
          },
          quation: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Quation',
          },
          
        answerdesc:{
            type:String,
            max:10000
        },
        
        img:{
            type:String
        },
        likes:{
            type:Array,
            default:[]
        }
    },
{ timestamps: true}
);
module.exports =mongoose.model("Answer", AnswerSchema)