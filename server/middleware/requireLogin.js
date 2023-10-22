const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys')
const mongoose = require('mongoose')
const User = mongoose.model("User")
module.exports = (req,res,next)=>{
    const {authorization} = req.headers
    if (!authorization){
        return res.status(401).json({erro:"please Login first!"}) 
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err){
            return res.status(401).json({err:"please Login first!"})
        }

        const  {id} = payload

        User.findById(id).then(userdata =>{
            req.user = userdata
            next()
        })
    })
}