const mongoose = require('mongoose')

const ImageSchema = new mongoose.Schema({
    url:{
        type:"String",
        req:true
    },publicId:{
          type:"String",
        req:true
    }, uploadby:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        req:true
    }
},{timestamps:true});

module.exports= mongoose.model("Image",ImageSchema);