const mongoose = require ("mongoose");

const PostSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
          },
          
        desc:{
            type:String,
            max:500
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
module.exports =mongoose.model("Post", PostSchema)