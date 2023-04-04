const mongoose = require ("mongoose");

const QuationSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
          },
          
        quationdesc:{
            type:String,
            max:10000
        },
        
        img:{
            type:String
        }
    },
{ timestamps: true}
);
module.exports =mongoose.model("Quation", QuationSchema)