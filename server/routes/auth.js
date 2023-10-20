const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")

router.get('/',(req,res) => {
    res.send("Welcome to Goa")
})

router.post('/signup',(req,res) =>{
    const {name,email,password} = req.body
    if(!email || !name || !password)
    {
        return res.status(404).json({error:'please enter required field'})
    }
    User.findOne({ email: email })
    .then((saveUser)=>{
        if (saveUser){
            return res.status(422).json({ error:"Email is already in use"});
        }
        else{
            const user =new User({
                email,
                password,
                name
            })
            user.save()
            .then(user=>{
                res.json({message:"saved Successfully"})
            })
            .catch(err =>{
                console,log(err)
            })
        }
    })
    .catch(err=>{
        console.log(err);
    })
})

module.exports = router