const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys')
const  requireLogin = require('../middleware/requireLogin')

router.get('/protect',requireLogin,(req,res) => {
    
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
            bcrypt.hash(password,16)
            .then(hashedpassword =>{
                const user =new User({
                    email,
                    password:hashedpassword,
                    name
                })
                user.save()
                .then(user=>{
                    res.json({message:"saved Successfully"})
                })
                .catch(err =>{
                    console,log(err)
                })
            })
            
        }
    })
    .catch(err=>{
        console.log(err);
    })
})

router.post('/signin',(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password)
    {
        return res.status(422).json({error:"please enter email and password"})
    }
    else{
        User.findOne({email:email})
        .then(savedUser =>{
            if (!savedUser){
                return res.status(422).json({error:"Invalid credential!"})
            }
            bcrypt.compare(password,savedUser.password)
            .then(doMatch =>{
                if(!doMatch){
                   return res.status(422).json({error:"Invalid password!"})
                }
                else{
                    const token = jwt.sign({id:savedUser._id},JWT_SECRET)
                    return res.json({token:token})
                }
            })
            .catch(err =>{
                console.log(err);
            })
        })
    }
})

module.exports = router