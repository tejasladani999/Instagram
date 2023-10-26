const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    body:{
        type: String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    postedBy:{
        type: ObjectId,
        ref:"User"
    },
    likes:[{type:ObjectId,ref:"User"}],
    comments:[{
        text:String,
        postedBy:{type:ObjectId,ref:"User"}
    }],
    postedBy:{
        type:ObjectId,
        ref:'User'
    }
})

mongoose.model("Post",postSchema)
