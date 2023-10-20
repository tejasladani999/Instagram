const mongoos =require('mongoose')
const userScema = new mongoos.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

mongoos.model("User",userScema)